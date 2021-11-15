// I decided to not use redux's createSlice, because I prefer plain event
// objects instead of 'action creators' due to their transparency. But I wanted
// to avoid the infamous wordiness of traditional reducers, so I used Immer directly
import produce from 'immer'
import type {
  ApiDeltaMsg,
  ApiSnapshotMsg,
  Orderbook,
  Price,
  Size
} from 'src/store/types'
import type { Modify } from 'src/util-types'
import { AVLTree } from '@foxglove/avl'

export type MainEvent =
  | { type: 'INIT' }
  | { type: 'BLURRED' }
  | { type: 'FOCUSED' }
  | { type: 'SNAPSHOT_UPDATE'; data: ApiSnapshotMsg }
  | { type: 'DELTA_UPDATE'; data: ApiDeltaMsg }

export type MainSlice = {
  productId: 'PI_XBTUSD' | 'PI_ETHUSD'
  orderbook?: Orderbook
  updateCounter: number
  state: 'idle' | 'live' | 'paused'
}

const initialState: MainSlice = {
  productId: 'PI_XBTUSD',
  updateCounter: 0,
  state: 'idle'
}

const mainReducer = (state: MainSlice = initialState, event: MainEvent) =>
  produce(state, (draft) => {
    switch (event.type) {
      case 'SNAPSHOT_UPDATE':
        const bidsTree = new AVLTree<Price, Size>()
        for (const order of event.data.bids) {
          bidsTree.set(order[0], order[1])
        }

        const asksTree = new AVLTree<Price, Size>()
        for (const order of event.data.asks) {
          asksTree.set(order[0], order[1])
        }

        draft.orderbook = {
          ...event.data,
          bids: bidsTree,
          asks: asksTree
        }

        break

      case 'DELTA_UPDATE':
        for (const order of event.data.bids) {
          if (order[1] === 0) {
            draft.orderbook!.bids.delete(order[0])
          } else {
            draft.orderbook!.bids.set(order[0], order[1])
          }
          draft.updateCounter++
        }

        for (const order of event.data.asks) {
          if (order[1] === 0) {
            draft.orderbook!.asks.delete(order[0])
          } else {
            draft.orderbook!.asks.set(order[0], order[1])
          }
          draft.updateCounter++
        }

        break

      case 'BLURRED':
        draft.state = 'paused'
        break

      case 'FOCUSED':
        draft.state = 'live'
        break
    }
  })

export default mainReducer

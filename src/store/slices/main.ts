// I decided to not use redux's createSlice, because I prefer plain event
// objects instead of 'action creators' due to their transparency. But I wanted
// to avoid the infamous wordiness of traditional reducers, so I used Immer directly
import produce from 'immer'
import type {
  ApiOrder,
  ApiOrderbook,
  Orderbook,
  Price,
  Size
} from 'src/store/types'
import type { Modify } from 'src/util-types'
import { AVLTree } from '@foxglove/avl'

export type MainEvent =
  | { type: 'INIT' }
  | { type: 'SNAPSHOT_UPDATE'; data: ApiOrderbook }
  | { type: 'DELTA_UPDATE'; data: ApiOrderbook }

export type MainSlice = {
  orderbook: Orderbook
  updateCounter: number
}

const initialState: MainSlice = {
  orderbook: {
    numLevels: 25,
    feed: '',
    product_id: 'PI_XBTUSD'
  },
  updateCounter: 0
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
        for (const order of event.data.bids) {
          asksTree.set(order[0], order[1])
        }

        draft.orderbook = {
          ...event.data,
          bids: bidsTree,
          asks: asksTree
        }

        break

      case 'DELTA_UPDATE':
        draft.orderbook.feed = event.data.feed

        for (const order of event.data.bids) {
          if (order[1] === 0) {
            draft.orderbook.bids!.delete(order[0])
          } else {
            draft.orderbook.bids!.set(order[0], order[1])
          }
          draft.updateCounter++
        }

        for (const order of event.data.asks) {
          if (order[1] === 0) {
            draft.orderbook.asks!.delete(order[0])
          } else {
            draft.orderbook.asks!.set(order[0], order[1])
          }
          draft.updateCounter++
        }

        break
    }
  })

export default mainReducer

// I decided to not use redux's createSlice, because I prefer plain event
// objects instead of 'action creators' due to their transparency. But I wanted
// to avoid the infamous wordiness of traditional reducers, so I used Immer directly
import { AVLTree } from '@foxglove/avl';
import produce from 'immer';
import type {
  ApiDeltaMsg,
  ApiSnapshotMsg,
  Orderbook,
  Price,
  Size
} from 'src/store/types';

// Imperative means request, past tense means occurred event
export type MainEvent =
  | { type: 'feed/SUB' }
  | { type: 'feed/UNSUB' }
  | { type: 'feed/TOGGLE' }
  | { type: 'feed/SNAPSHOT_UPDATE'; data: ApiSnapshotMsg }
  | { type: 'feed/DELTA_UPDATE'; data: ApiDeltaMsg }
  | { type: 'app/RENDER_TICK' }
  | { type: 'app/RENDER_TIME_UPDATE'; data: number }
  | { type: 'app/BLURRED' }
  | { type: 'app/FOCUSED' }

export type MainSlice = {
  productId: 'PI_XBTUSD' | 'PI_ETHUSD'
  orderbook?: Orderbook
  updateCounter: number
  state: 'idle' | 'connecting' | 'live' | 'paused'
  renderTime: number
}

const initialState: MainSlice = {
  productId: 'PI_XBTUSD',
  updateCounter: 0,
  state: 'idle',
  renderTime: 0
}

const mainReducer = (state: MainSlice = initialState, event: MainEvent) =>
  produce(state, (draft) => {
    switch (event.type) {
      case 'feed/SNAPSHOT_UPDATE':
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

      case 'feed/DELTA_UPDATE':
        for (const order of event.data.bids) {
          if (order[1] === 0) {
            draft.orderbook!.bids.delete(order[0])
          } else {
            draft.orderbook!.bids.set(order[0], order[1])
          }
        }

        for (const order of event.data.asks) {
          if (order[1] === 0) {
            draft.orderbook!.asks.delete(order[0])
          } else {
            draft.orderbook!.asks.set(order[0], order[1])
          }
        }
        break

      case 'app/RENDER_TICK':
        if (state.state === 'live') {
          draft.updateCounter += 1
        }
        break

      case 'feed/SUB':
        draft.state = 'live'
        break

      case 'app/BLURRED':
        draft.state = 'paused'
        break

      case 'feed/UNSUB':
        draft.state = 'idle'
        break

      case 'feed/TOGGLE':
        draft.productId =
          draft.productId === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD'
        break

      case 'app/RENDER_TIME_UPDATE':
        draft.renderTime = event.data
        break
    }
  })

export default mainReducer

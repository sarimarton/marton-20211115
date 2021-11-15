import type { AVLTree } from '@foxglove/avl'
import type { Modify } from 'src/util-types'

export type ApiOrder = [number, number]

export type ProductId = 'PI_XBTUSD' | 'PI_ETHUSD'

export type ApiSnapshotMsg = {
  numLevels: 25
  feed: 'book_ui_1_snapshot'
  bids: ApiOrder[]
  asks: ApiOrder[]
  product_id: 'PI_XBTUSD' | 'PI_ETHUSD'
}

export type ApiDeltaMsg = {
  asks: ApiOrder[]
  bids: ApiOrder[]
  feed: 'book_ui_1'
  product_id: ProductId
}

export type ApiSubscriptionMsg = {
  event: 'subscribed'
  feed: 'book_ui_1'
  product_ids: ProductId[]
}

export type ApiMsg = ApiSnapshotMsg | ApiDeltaMsg | ApiSubscriptionMsg

export type Price = number

export type Size = number

export type Orderbook = {
  bids: AVLTree<Price, Size>
  asks: AVLTree<Price, Size>
}

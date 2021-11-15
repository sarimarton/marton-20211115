import type { AVLTree } from "@foxglove/avl";
import type { Modify } from "src/util-types";

export type ApiOrder = [number, number]

export type ApiOrderbook = {
  numLevels: 25
  feed: '' | 'book_ui_1_snapshot' | 'book_ui_1'
  bids: ApiOrder[]
  asks: ApiOrder[]
  product_id: 'PI_XBTUSD' | 'PI_ETHUSD'
}

export type Price = number

export type Size = number

export type Orderbook = Modify<ApiOrderbook, {
  bids?: AVLTree<Price, Size>
  asks?: AVLTree<Price, Size>
}>


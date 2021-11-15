import { createSelector } from 'reselect'
import type { Store } from 'src/store/store'

const depth = 50

export const selectFirst50Bids = createSelector(
  (root: Store) => root.main.updateCounter,
  (root: Store) => root.main.orderbook?.bids,
  (counter, tree) => {
    let entries = []
    let entry = tree?.maxEntry()
    let total = 0
    while (entry && entries.length < depth) {
      total += entry[1]
      entries.push({ price: entry[0], size: entry[1], total })
      entry = tree!.findLessThan(entry[0])
    }
    return entries
  }
)

export const selectFirst50Asks = createSelector(
  (root: Store) => root.main.updateCounter,
  (root: Store) => root.main.orderbook?.bids,
  (counter, tree) => {
    let entries = []
    let entry = tree?.minEntry()
    let total = 0
    while (entry && entries.length < depth) {
      total += entry[1]
      entries.push({ price: entry[0], size: entry[1], total })
      entry = tree!.findGreaterThan(entry[0])
    }
    return entries
  }
)

export const selectTotalMax = createSelector(
  (root: Store) => root.main.updateCounter,
  selectFirst50Bids,
  selectFirst50Asks,
  (counter, bids, asks) =>
    Math.max(bids.slice(-1)[0]?.total || 0, asks.slice(-1)[0]?.total || 0)
)

export const selectSpread = createSelector(
  (root: Store) => root.main.updateCounter,
  selectFirst50Bids,
  selectFirst50Asks,
  (counter, bids, asks) => ({
    priceDiff: (asks[0]?.price || 0) - (bids[0]?.price || 0),
    price: asks[0]?.price || 0
  })
)

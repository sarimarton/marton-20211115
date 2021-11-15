import React from 'react'
import { selectSpread } from 'src/store/selectors/selectors'
import { useSelector } from 'src/store/store'

interface Props {
  className?: string
}

export default function OrderbookSpread(props: Props) {
  const feed = useSelector((root) => root.main.orderbook.feed)
  const spread = useSelector(selectSpread)

  return feed === '' ? (
    <></>
  ) : (
    <div
      className={`text-gray-600 sm:translate-x-[-50%] sm:left-1/2 mx-auto sm:transform sm:absolute ${props.className}`}
    >
      Spread: {spread.priceDiff} (
      {((spread.priceDiff * 100) / spread.price).toFixed(2)}%)
    </div>
  )
}

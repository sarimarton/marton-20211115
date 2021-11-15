import React from 'react'
import { selectSpread } from 'src/store/selectors/selectors'
import { useSelector } from 'src/store/store'

interface Props {
  className?: string
}

export default function OrderbookSpread(props: Props) {
  const feedState = useSelector((root) => root.main.state)
  const spread = useSelector(selectSpread)

  return feedState !== 'live' ? (
    <></>
  ) : (
    <div
      className={`text-gray-600 sm:translate-x-[-50%] sm:left-1/2 mx-auto sm:transform sm:absolute ${props.className}`}
    >
      Spread: {spread.priceDiff.toFixed(1)} (
      {((spread.priceDiff * 100) / spread.price).toFixed(2)}%)
    </div>
  )
}

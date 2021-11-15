import React, { useEffect } from 'react'
import { selectFirst50Bids } from 'src/store/selectors/selectors'
import { useDispatch, useSelector } from 'src/store/store'
import OrderbookRow from './OrderbookRow'
import OrderbookRowHeader from './OrderbookRowHeader'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function OrderbookBids(props: Props) {
  const dispatch = useDispatch()
  const bids = useSelector(selectFirst50Bids)

  // Absolutely rudimentary performance measurement of render+paint
  const start = performance.now()
  useEffect(() => {
    dispatch({ type: 'RENDER_TIME_UPDATE', data: performance.now() - start })
  })

  return (
    <div
      className={`overflow-hidden ${props.className}`}
      style={{ flexBasis: 0 }}
    >
      <div className="h-full">
        <OrderbookRowHeader className="hidden sm:flex sm:flex-row-reverse" />
        <div>
          {bids.map((bid) => {
            return (
              <OrderbookRow
                key={bid.price}
                className="sm:flex-row-reverse"
                price={
                  <span className="text-green-500">{bid.price.toFixed(2)}</span>
                }
                size={bid.size}
                total={bid.total}
                stripClassName="bg-green-900 sm:right-0"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

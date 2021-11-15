import React from 'react'
import { selectFirst50Bids } from 'src/store/selectors/selectors';
import { useSelector } from 'src/store/store'
import OrderbookRow from './OrderbookRow'
import OrderbookRowHeader from './OrderbookRowHeader'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function OrderbookBids(props: Props) {
  const bids = useSelector(selectFirst50Bids)

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

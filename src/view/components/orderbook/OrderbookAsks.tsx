import React from 'react'
import { selectFirst50Asks } from 'src/store/selectors/selectors'
import { useSelector } from 'src/store/store'
import format from 'src/view/utils/formatNumber'
import OrderbookRow from './OrderbookRow'
import OrderbookRowHeader from './OrderbookRowHeader'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function OrderbookAsks(props: Props) {
  const asks = useSelector(selectFirst50Asks)

  return (
    <div
      className={`overflow-hidden ${props.className}`}
      style={{ flexBasis: 0 }}
    >
      <div className="h-full">
        <OrderbookRowHeader />
        <div
          className="flex flex-col-reverse overflow-hidden sm:flex-col"
          style={{
            height: 'calc(100% - 25px)'
          }}
        >
          {asks.map((ask) => {
            return (
              <OrderbookRow
                key={ask.price}
                className=""
                price={
                  <span className="text-red-500">{format(ask.price, 2)}</span>
                }
                size={ask.size}
                total={ask.total}
                stripClassName="bg-red-900"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

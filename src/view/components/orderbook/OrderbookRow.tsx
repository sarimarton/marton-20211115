import React, { ReactElement } from 'react'
import { selectTotalMax } from 'src/store/selectors/selectors'
import { useSelector } from 'src/store/store'
import format from 'src/view/utils/formatNumber'

interface Props {
  className?: string
  children?: React.ReactNode
  price: string | number | ReactElement
  size: string | number | ReactElement
  total: string | number | ReactElement
  stripClassName?: string
}

export default function OrderbookRow(props: Props) {
  const totalMax = useSelector(selectTotalMax)

  return (
    <div className="relative">
      {props.stripClassName && typeof props.total === 'number' && (
        <div
          className={`absolute h-full opacity-30 ${props.stripClassName}`}
          style={{ width: (props.total * 100) / totalMax + '%' }}
        />
      )}
      <div className={`relative z-10 flex pr-8 sm:px-8 ${props.className}`}>
        <div className="tabular-numbs w-1/3 text-right">
          {typeof props.price === 'number' ? format(props.price, 2) : props.price}
        </div>
        <div className="tabular-numbs w-1/3 text-right">
          {typeof props.size === 'number' ? format(props.size) : props.size}
        </div>
        <div className="tabular-numbs w-1/3 text-right">
          {typeof props.total === 'number' ? format(props.total) : props.total}
        </div>
      </div>
    </div>
  )
}

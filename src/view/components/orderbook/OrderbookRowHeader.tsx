import React from 'react'
import OrderbookRow from './OrderbookRow';

interface Props {
  className?: string
}

export default function OrderbookRowHeader(props: Props) {
  return (
    <OrderbookRow
      className={`text-gray-600 border-b border-t-2 border-gray-600 uppercase ${props.className}`}
      price={'Price'}
      size={'Size'}
      total={'Total'}
    />
  )
}

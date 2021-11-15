import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'src/store/store'
import OrderbookFooter from './OrderbookFooter'
import OrderbookHeader from './OrderbookHeader'
import OrderbookSpread from './OrderbookSpread'
import OrderbookBids from './OrderbookBids'
import OrderbookAsks from './OrderbookAsks'

interface Props {}

export default function Orderbook({}: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'INIT' })
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-gray-900">
      <OrderbookHeader>
        <OrderbookSpread className="hidden sm:block" />
        Order Book
      </OrderbookHeader>
      <div className="flex flex-col-reverse flex-grow sm:flex-row sm:h-0">
        <OrderbookBids className="flex-grow" />
        <OrderbookSpread className="block sm:hidden" />
        <OrderbookAsks className="flex-grow" />
      </div>
      <OrderbookFooter />
    </div>
  )
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store/store';
import OrderbookAsks from './OrderbookAsks';
import OrderbookBids from './OrderbookBids';
import OrderbookFooter from './OrderbookFooter';
import OrderbookHeader from './OrderbookHeader';
import OrderbookSpread from './OrderbookSpread';

interface Props {}

export default function Orderbook({}: Props) {
  const dispatch = useDispatch()
  const state = useSelector((root) => root.main.state)

  useEffect(() => {
    dispatch({ type: 'feed/SUB' })
  }, [])

  return (
    <div
      className={`flex flex-col w-full h-full bg-gray-900 ${
        state === 'paused' ? 'opacity-25' : ''
      }`}
    >
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

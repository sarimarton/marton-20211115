import React, { useEffect } from 'react'
import { useDispatch } from 'src/store/store'
import Orderbook from './components/orderbook/Orderbook'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'INIT' })
  }, [])

  return (
    <div className="v-screen h-screen text-white font-mono text-sm leading-relaxed bg-gray-900 bg-opacity-80 sm:px-8 sm:py-4">
      <Orderbook />
    </div>
  )
}

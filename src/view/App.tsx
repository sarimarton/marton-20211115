import React, { useEffect } from 'react'
import { useDispatch } from 'src/store/store'
import Orderbook from './components/orderbook/Orderbook'
import { usePageVisibility } from 'react-page-visibility'

export default function App() {
  const dispatch = useDispatch()
  const isVisible = usePageVisibility()

  useEffect(() => {
    dispatch({ type: 'INIT' })
  }, [])

  useEffect(() => {
    window.addEventListener('blur', () => dispatch({ type: 'BLURRED' }))
    window.addEventListener('focus', () => dispatch({ type: 'FOCUSED' }))
  }, [])

  useEffect(() => {
    dispatch({ type: isVisible ? 'FOCUSED' : 'BLURRED' })
  }, [isVisible])

  return (
    <div className="v-screen h-screen text-white font-mono text-sm leading-relaxed bg-gray-900 bg-opacity-80 sm:px-8 sm:py-4">
      <Orderbook />
    </div>
  )
}

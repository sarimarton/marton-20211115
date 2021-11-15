import React, { useEffect } from 'react';
import { usePageVisibility } from 'react-page-visibility';
import { useDispatch } from 'src/store/store';
import Orderbook from './components/orderbook/Orderbook';

export default function App() {
  const dispatch = useDispatch()
  const isVisible = usePageVisibility()

  useEffect(() => {
    dispatch({ type: 'feed/SUB' })
  }, [])

  useEffect(() => {
    window.addEventListener('blur', () => dispatch({ type: 'app/BLURRED' }))
    window.addEventListener('focus', () => dispatch({ type: 'app/FOCUSED' }))
  }, [])

  useEffect(() => {
    dispatch({ type: isVisible ? 'app/FOCUSED' : 'app/BLURRED' })
  }, [isVisible])

  return (
    <div className="v-screen h-screen text-white font-mono text-sm leading-relaxed bg-gray-900 bg-opacity-80 sm:px-8 sm:py-4">
      <Orderbook />
    </div>
  )
}

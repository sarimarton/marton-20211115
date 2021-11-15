import React from 'react'
import { useDispatch, useSelector } from 'src/store/store'
import Button from 'src/view/components/Button'

interface Props {}

export default function OrderbookFooter(props: Props) {
  const state = useSelector(root => root.main.state)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-wrap justify-center p-4 text-xs">
      <Button
        className="text-center"
        disabled={state !== 'live'}
        onClick={() => dispatch({ type: 'FEED_TOGGLED' })}
      >
        Toggle Feed
      </Button>
    </div>
  )
}

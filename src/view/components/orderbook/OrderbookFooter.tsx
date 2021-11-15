import React from 'react'
import { useDispatch } from 'src/store/store'
import Button from 'src/view/components/Button'

interface Props {}

export default function OrderbookFooter(props: Props) {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-wrap justify-center p-4 text-xs">
      <Button
        className="text-center"
        onClick={() => dispatch({ type: 'FEED_TOGGLED' })}
      >
        Toggle Feed
      </Button>
    </div>
  )
}

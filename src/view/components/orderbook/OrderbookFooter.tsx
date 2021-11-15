import React from 'react'
import Button from 'src/view/components/Button'

interface Props {}

export default function OrderbookFooter(props: Props) {
  return (
    <div className="flex flex-wrap justify-center p-4 text-xs">
      <Button className="text-center">Toggle Feed</Button>
    </div>
  )
}

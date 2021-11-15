import React from 'react'

import css from './Button.css'
const _button = css('button')

interface Props {
  children: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export default function Button(props: Props) {
  return (
    <_button {...props} />
  )
}

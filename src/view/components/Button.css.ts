import tw from 'tailwind-styled-components'

export default (element: any) => tw(element)`
  rounded
  border
  border-transparent
  hover:border-gray-300
  disabled:text-gray-400
  disabled:cursor-default
  disabled:border-transparent
  p-1
  bg-purple-500
  text-white
  px-4
`

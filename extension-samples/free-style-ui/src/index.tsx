import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Box } from '@fower/react'

export function Main() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((cur) => cur + 1)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <Box>
      <Box fontBold text3XL>
        Hello world, {count}
      </Box>
      <Box
        as="button"
        white
        outlineNone
        p3
        textLG
        border
        roundedFull
        bgBlack
        opacity-70--hover
        onClick={() => {
          console.log('hello.......')
        }}
      >
        Click me
      </Box>
    </Box>
  )
}

//
const domNode = document.getElementById('root')!
const root = createRoot(domNode)

root.render(<Main />)

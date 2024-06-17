import { useEffect } from 'react'

export function Main() {
  useEffect(() => {
    window.parent.postMessage('Hello from the extension!')

    // window.addEventListener('message', (event) => {
    //   console.log('iframe received event:', event)
    // })
  }, [])

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-4xl">Hello World!</h1>
    </div>
  )
}

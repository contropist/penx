import { useState } from 'react'

export function Main() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center items-center h-full">
      <button
        className="outline-none p-3 text-lg border rounded-3xl bg-gray-200 hover:opacity-70 "
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Count is {count}
      </button>
    </div>
  )
}

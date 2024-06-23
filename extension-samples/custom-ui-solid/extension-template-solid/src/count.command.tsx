import { createSignal } from 'solid-js'

export function Main() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="flex justify-center items-center h-full bg-gradient-to-r from-cyan-500 to-blue-500">
      <button
        class="outline-none p-3 text-lg rounded-3xl bg-blue-300 hover:opacity-70 "
        onClick={() => {
          setCount(count() + 1)
        }}
      >
        Count is {count()}
      </button>
    </div>
  )
}

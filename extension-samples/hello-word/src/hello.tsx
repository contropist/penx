import { createRoot } from 'react-dom/client'

export function Main() {
  return <div>name</div>
}

const domNode = document.getElementById('root')!
const root = createRoot(domNode)

root.render(<Main />)

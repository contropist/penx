import * as esbuild from 'esbuild'
import fs from 'fs'
import { CommandItem } from '../types'

const prefix = `
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  import { createRoot } from 'react-dom/client'
  import '../.penx/index.css'

  const queryClient = new QueryClient()
`
const postfix = `
  const domNode = document.getElementById('root')!  
  const root = createRoot(domNode)

  root.render(
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
`

export function createReactPlugin(commands: CommandItem[]) {
  const plugin: esbuild.Plugin = {
    name: 'add-react-code',
    setup(build) {
      build.onLoad({ filter: /\.(t|j)sx?$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')

        const path = args.path as string

        const cmd = commands.find((item) => {
          return `${item.name}.command.tsx` === path.split('/').pop()! && item.mode === 'custom-ui'
        })

        if (!cmd) return null

        if (cmd.framework !== 'react') return null

        const modifiedContents = `${prefix}${contents}${postfix}`

        return {
          contents: modifiedContents,
          loader: 'tsx',
        }
      })
    },
  }
  return plugin
}

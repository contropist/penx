import * as esbuild from 'esbuild'
import fs from 'fs'
import { CommandItem } from '../types'

export function createReactPlugin(commands: CommandItem[]) {
  const plugin: esbuild.Plugin = {
    name: 'add-code',
    setup(build) {
      build.onLoad({ filter: /\.(t|j)sx?$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')

        const path = args.path as string

        const cmd = commands.find((item) => {
          return `${item.name}.command.tsx` === path.split('/').pop()! && item.runtime === 'iframe'
        })

        if (!cmd) return null

        if (cmd.framework !== 'react') return null

        const prefix = `
              import { createRoot } from 'react-dom/client'
              import '../.penx/index.css'
            `
        const postfix = `
              const domNode = document.getElementById('root')!  
              const root = createRoot(domNode)
              root.render(<Main />)
            `

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

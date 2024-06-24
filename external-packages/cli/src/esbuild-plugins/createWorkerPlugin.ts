import * as esbuild from 'esbuild'
import fs from 'fs'
import { CommandItem } from '../types'

export function createWorkerPlugin(commands: CommandItem[]) {
  const plugin: esbuild.Plugin = {
    name: 'add-worker-main-code',
    setup(build) {
      build.onLoad({ filter: /\.(t|j)sx?$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')

        const path = args.path as string

        const every = commands.every((item) => item.mode !== 'custom-ui')

        if (!every) return null

        const fileName = path.split('/').pop() || ''
        if (!fileName.endsWith('.command.ts')) return null

        const postfix = `
          \nmain()
        `

        const modifiedContents = `${contents}${postfix}`

        return {
          contents: modifiedContents,
          loader: 'ts',
        }
      })
    },
  }
  return plugin
}

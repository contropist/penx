import { Plugin } from 'esbuild'
import { parse } from 'node:path'
import { readFile } from 'node:fs/promises'
import { transformAsync, TransformOptions } from '@babel/core'
// @ts-ignore
import solid from 'babel-preset-solid'
// @ts-ignore
import ts from '@babel/preset-typescript'
import { CommandItem } from '../types'

// These options are partly taken from vite-plugin-solid:

/** Configuration options for esbuild-plugin-solid */
export interface Options {
  /** The options to use for @babel/preset-typescript @default {} */
  typescript?: object
  /**
   * Pass any additional babel transform options. They will be merged with
   * the transformations required by Solid.
   *
   * @default {}
   */
  babel?:
    | TransformOptions
    | ((source: string, id: string, ssr: boolean) => TransformOptions)
    | ((source: string, id: string, ssr: boolean) => Promise<TransformOptions>)
  /**
   * Pass any additional [babel-plugin-jsx-dom-expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options).
   * They will be merged with the defaults sets by [babel-preset-solid](https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/index.js#L8-L25).
   *
   * @default {}
   */
  solid?: {
    /**
     * The name of the runtime module to import the methods from.
     *
     * @default "solid-js/web"
     */
    moduleName?: string

    /**
     * The output mode of the compiler.
     * Can be:
     * - "dom" is standard output
     * - "ssr" is for server side rendering of strings.
     * - "universal" is for using custom renderers from solid-js/universal
     *
     * @default "dom"
     */
    generate?: 'ssr' | 'dom' | 'universal'

    /**
     * Indicate whether the output should contain hydratable markers.
     *
     * @default false
     */
    hydratable?: boolean

    /**
     * Boolean to indicate whether to enable automatic event delegation on camelCase.
     *
     * @default true
     */
    delegateEvents?: boolean

    /**
     * Boolean indicates whether smart conditional detection should be used.
     * This optimizes simple boolean expressions and ternaries in JSX.
     *
     * @default true
     */
    wrapConditionals?: boolean

    /**
     * Boolean indicates whether to set current render context on Custom Elements and slots.
     * Useful for seemless Context API with Web Components.
     *
     * @default true
     */
    contextToCustomElements?: boolean

    /**
     * Array of Component exports from module, that aren't included by default with the library.
     * This plugin will automatically import them if it comes across them in the JSX.
     *
     * @default ["For","Show","Switch","Match","Suspense","SuspenseList","Portal","Index","Dynamic","ErrorBoundary"]
     */
    builtIns?: string[]
  }
}

export function createSolidPlugin(commands: CommandItem[], options?: Options) {
  const plugin: Plugin = {
    name: 'esbuild:solid',

    setup(build) {
      build.onLoad({ filter: /\.(t|j)sx$/ }, async (args) => {
        const path = args.path as string

        const cmd = commands.find((item) => {
          return `${item.name}.command.tsx` === path.split('/').pop()! && item.runtime === 'iframe'
        })

        if (!cmd) return null

        if (cmd.framework !== 'solid') return null

        let source = await readFile(path, { encoding: 'utf-8' })

        const { name, ext } = parse(path)
        const filename = name + ext

        const prefix = `
              import { render } from 'solid-js/web'
              import '../.penx/index.css'\n
            `

        const postfix = `
              render(() => <Main />, document.getElementById('root')!)
            `

        source = `${prefix}${source}${postfix}`

        const result = await transformAsync(source, {
          presets: [
            [solid, options?.solid ?? {}],
            [ts, options?.typescript ?? {}],
          ],
          filename,
          sourceMaps: 'inline',
          ...(options?.babel ?? {}),
        })

        if (result?.code === undefined || result.code === null) {
          throw new Error('No result was provided from Babel')
        }

        return { contents: result.code, loader: 'js' }
      })
    },
  }

  return plugin
}

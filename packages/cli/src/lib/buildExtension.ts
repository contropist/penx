import * as esbuild from 'esbuild'
import chalk from 'chalk'
import fs from 'fs'
import { join } from 'path'
import { getManifest } from './getManifest'

interface Options {
  watch?: boolean
  onSuccess?: () => Promise<void>
}

export async function buildExtension({ watch = false, onSuccess }: Options) {
  const cwd = process.cwd()
  const manifest = getManifest()

  const entries = manifest.commands.reduce<string[]>((acc, cur) => {
    const entry = join(cwd, 'src', `${cur.name}.ts`)
    return [...acc, entry]
  }, [])

  const onEndPlugin: esbuild.Plugin = {
    name: 'onEnd',
    setup(build) {
      build.onEnd((result) => {
        const len = result.errors.length
        const str = `Build end with ${len} errors`
        console.log(len > 0 ? chalk.red(str) : chalk.green(str))
        onSuccess?.()
      })
    },
  }

  const addMainPlugin: esbuild.Plugin = {
    name: 'add-code',
    setup(build) {
      build.onLoad({ filter: /\.(t|j)s$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')

        if (entries.includes(args.path)) {
          const modifiedContents = `${contents}\nmain();`
          return { contents: modifiedContents }
        }
        return null
      })
    },
  }

  const buildOptions = {
    entryPoints: entries,
    outdir: 'dist',
    bundle: true,
    format: 'iife',
    platform: 'browser',
    tsconfig: join(cwd, 'tsconfig.json'),
    logLevel: 'debug',
    loader: { '.ts': 'ts' },
    treeShaking: true,
  } as esbuild.BuildOptions

  if (watch) {
    const ctx = await esbuild.context({
      ...buildOptions,
      plugins: [addMainPlugin, onEndPlugin],
    })

    ctx.watch()
  } else {
    await esbuild.build({
      ...buildOptions,
      minify: true,
      plugins: [addMainPlugin],
    })
    onSuccess?.()
  }
}

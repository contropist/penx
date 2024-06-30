import * as esbuild from 'esbuild'
import chalk from 'chalk'

export function createOnEndPlugin(fn?: () => Promise<void>) {
  const onEndPlugin: esbuild.Plugin = {
    name: 'on-end',
    setup(build) {
      build.onEnd((result) => {
        const len = result.errors.length
        const str = `Build end with ${len} errors`
        console.log(len > 0 ? chalk.red(str) : chalk.green(str))
        fn?.()
      })
    },
  }
  return onEndPlugin
}

import fs from 'fs-extra'
import path from 'path'
import postcss from 'postcss'
import util from 'util'
import tmp from 'tmp'
import { Plugin } from 'esbuild'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const ensureDir = util.promisify(fs.ensureDir)

interface PostCSSPluginOptions {
  plugins: postcss.AcceptedPlugin[]
  rootDir?: string
}

export const postcssPlugin = (options: PostCSSPluginOptions = { plugins: [] }): Plugin => ({
  name: 'postcss',
  setup(build) {
    const { rootDir = options.rootDir || process.cwd() } = options
    const tmpDirPath = tmp.dirSync().name

    build.onResolve({ filter: /\.css$/, namespace: 'file' }, async (args) => {
      const sourceFullPath = path.resolve(args.resolveDir, args.path)
      const sourceExt = path.extname(sourceFullPath)
      const sourceBaseName = path.basename(sourceFullPath, sourceExt)
      const sourceDir = path.dirname(sourceFullPath)
      const sourceRelDir = path.relative(path.dirname(rootDir), sourceDir)

      const tmpDir = path.resolve(tmpDirPath, sourceRelDir)
      const tmpFilePath = path.resolve(tmpDir, `${sourceBaseName}.css`)
      await ensureDir(tmpDir)

      const css = await readFile(sourceFullPath)

      const result = await postcss(options.plugins).process(css, {
        from: sourceFullPath,
        to: tmpFilePath,
      })

      // Write result file
      await writeFile(tmpFilePath, result.css)

      return {
        path: tmpFilePath,
      }
    })
  },
})

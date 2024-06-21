import { Octokit } from 'octokit'
import chalk from 'chalk'
import ora from 'ora'
import jetpack from 'fs-jetpack'
import yargs, { ArgumentsCamelCase } from 'yargs'
import { join } from 'path'
import fs from 'fs'
import { buildExtension } from '../lib/buildExtension'
import { getTRPC } from '../lib/trpc'
import { getManifest } from '../lib/getManifest'
import { iconToString } from '../lib/iconToString'
import { assetsToStringMap } from '../lib/assetsToStringMap'
import { isIconify, readConfig } from '../lib/utils'
import { getReadme } from '../lib/getReadme'
import { escAction } from '../constants'

type Args = {}

export type TreeItem = {
  path: string
  // mode: '100644' | '100755' | '040000' | '160000' | '120000'
  mode: '100644'
  // type: 'blob' | 'tree' | 'commit'
  type: 'blob'
  content?: string
  sha?: string | null
}

class Command {
  readonly command = 'release'
  readonly describe = 'PenX release'

  private app: Octokit

  private params = {
    owner: 'penxio',
    repo: 'marketplace',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }

  private baseBranchSha: string

  private trpc: any

  readonly builder = (args: yargs.Argv) => {
    return args.showHelpOnFail(true).strict()
  }

  handler = async (args: ArgumentsCamelCase<Args>) => {
    const config = readConfig()

    if (!config.user || !config.token) {
      console.log(
        chalk.yellow('Please login first, try to login by command:'),
        chalk.green('npx penx login'),
      )
      return
    }

    this.trpc = await getTRPC()

    await buildExtension({
      onSuccess: async () => {
        // console.log('Build success~')
        const spinner = ora('Upload the extension files...').start()
        try {
          const manifest = await getManifest()

          const canRelease = await this.trpc.extension.canReleaseExtension.query({
            name: manifest.name,
          })

          if (!canRelease) {
            spinner.fail(
              `"${manifest.name}" is a existed extension name, please use another extension name in your manifest.json`,
            )
            return
          }

          await this.handleBuildSuccess()

          const readme = getReadme()

          const screenshotsDir = join(process.cwd(), 'screenshots')
          const screenshotsPaths = jetpack.list(screenshotsDir) || []

          await this.trpc.extension.upsertExtension.mutate({
            name: manifest.name,
            manifest: JSON.stringify({
              ...manifest,
              screenshots: screenshotsPaths,
            }),
            readme,
            logo: isIconify(manifest.icon)
              ? JSON.stringify(manifest.icon)
              : await iconToString(manifest.icon),
          })

          spinner.succeed('Release success!')
        } catch (error) {
          spinner.fail('Release failed, please try again!')
          console.log(error)
        }
      },
    })
  }

  getReadmeContent(extensionName: string) {
    try {
      let readmePath = join(process.cwd(), 'README.md')
      if (!jetpack.exists(readmePath)) {
        readmePath = join(process.cwd(), 'readme.md')
      }

      return jetpack.read(readmePath, 'utf8')
    } catch (error) {
      return `## ${extensionName}`
    }
  }

  private async getInstallationContent() {
    const manifest = await getManifest()

    // add code manifest.commands
    for (const command of manifest.commands) {
      const codePath = join(process.cwd(), 'dist', `${command.name}.command.js`)
      const code = jetpack.read(codePath, 'utf8')
      command.code = code + escAction
    }

    const assets = await assetsToStringMap()
    return JSON.stringify({ ...manifest, assets }, null, 2)
  }

  async createTree() {
    let treeItems: TreeItem[] = []
    const manifest = await getManifest()

    for (const command of manifest.commands) {
      const codePath = join(process.cwd(), 'dist', `${command.name}.command.js`)
      const code = jetpack.read(codePath, 'utf8')

      treeItems.push({
        path: `extensions/${manifest.name}/dist/${command.name}.command.js`,
        mode: '100644',
        type: 'blob',
        content: code + escAction,
      })
    }

    /** assets */
    const assets = join(process.cwd(), 'assets')

    if (jetpack.exists(assets)) {
      const files = jetpack.list(assets) || []

      for (const file of files) {
        if (file.includes('.DS_Store')) continue
        const filePath = join(process.cwd(), 'assets', file)
        const fileItem = await this.createFileTreeItem(manifest.name, filePath, file, 'assets')

        treeItems.push(fileItem)
      }
    }

    /** screenshots */
    const screenshots = join(process.cwd(), 'screenshots')

    if (jetpack.exists(screenshots)) {
      const files = jetpack.list(screenshots) || []

      for (const file of files) {
        if (file.includes('.DS_Store')) continue
        const filePath = join(process.cwd(), 'screenshots', file)
        const fileItem = await this.createFileTreeItem(manifest.name, filePath, file, 'screenshots')

        treeItems.push(fileItem)
      }
    }

    treeItems.push({
      path: `extensions/${manifest.name}/manifest.json`,
      mode: '100644',
      type: 'blob',
      content: JSON.stringify(manifest, null, 2),
    })

    treeItems.push({
      path: `extensions/${manifest.name}/README.md`,
      mode: '100644',
      type: 'blob',
      content: this.getReadmeContent(manifest.name),
    })

    treeItems.push({
      path: `extensions/${manifest.name}/installation.json`,
      mode: '100644',
      type: 'blob',
      content: await this.getInstallationContent(),
    })

    return treeItems
  }

  async getBaseCommit() {
    const ref = await this.app.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      ...this.params,
      ref: `heads/main`,
    })

    this.baseBranchSha = ref.data.object.sha
    return this.baseBranchSha
  }

  async createFileTreeItem(
    extensionName: string,
    filePath: string,
    fileName: string,
    dirname: string,
  ) {
    const content = fs.readFileSync(filePath, { encoding: 'base64' })
    const { data } = await this.app.request('POST /repos/{owner}/{repo}/git/blobs', {
      ...this.params,
      content,
      encoding: 'base64',
    })

    const item: TreeItem = {
      path: `extensions/${extensionName}/${dirname}/${fileName}`,
      mode: '100644',
      type: 'blob',
      sha: data.sha,
    }

    return item
  }

  private async commit(treeSha: string) {
    const parentSha = this.baseBranchSha
    const manifest = await getManifest()
    const msg = `Release extension: ${manifest.name}`

    const commit = await this.app.request('POST /repos/{owner}/{repo}/git/commits', {
      ...this.params,
      message: `${msg}`,
      parents: [parentSha],
      tree: treeSha,
    })
    return commit
  }

  private async updateRef(commitSha: string = '') {
    await this.app.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
      ...this.params,
      ref: 'heads/main',
      sha: commitSha,
      force: true,
    })
  }

  private handleBuildSuccess = async () => {
    try {
      const token = await this.trpc.extension.getGitHubToken.query()

      this.app = new Octokit({ auth: token })

      const baseCommit = await this.getBaseCommit()

      // update tree to GitHub before commit
      const { data } = await this.app.request('POST /repos/{owner}/{repo}/git/trees', {
        ...this.params,
        tree: await this.createTree(),
        base_tree: baseCommit,
      })

      // create a commit for the tree
      const { data: commitData } = await this.commit(data.sha)

      // update ref to GitHub server after commit
      await this.updateRef(commitData.sha)
    } catch (error) {
      console.log('error', error)
    }
  }
}

const command = new Command()

export default command

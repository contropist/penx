import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
import * as shellx from 'tauri-plugin-shellx-api'
import { FetchSendResponse, Proxy } from './fetch/types'

export interface IDialog {
  ask: typeof dialog.ask
  confirm: typeof dialog.confirm
  message: typeof dialog.message
  open: (options?: dialog.OpenDialogOptions) => ReturnType<typeof dialog.open>
  save: typeof dialog.save
}

export interface IClipboard {
  readText: typeof clipboard.readText
  writeText: typeof clipboard.writeText
  readImageBase64: typeof clipboard.readImageBase64
  writeImageBase64: typeof clipboard.writeImageBase64
  readFiles: typeof clipboard.readFiles
  writeFiles: typeof clipboard.writeFiles
  readRtf: typeof clipboard.readRtf
  writeRtf: typeof clipboard.writeRtf
  readHtml: typeof clipboard.readHtml
  writeHtml: typeof clipboard.writeHtml
  writeHtmlAndText: typeof clipboard.writeHtmlAndText
  hasText: typeof clipboard.hasText
  hasRTF: typeof clipboard.hasRTF
  hasHTML: typeof clipboard.hasHTML
  hasImage: typeof clipboard.hasImage
  hasFiles: typeof clipboard.hasFiles
}

export interface INotification {
  sendNotification: typeof notification.sendNotification
  requestPermission: typeof notification.requestPermission
  isPermissionGranted: typeof notification.isPermissionGranted
}

export interface IFs {
  readDir: typeof fs.readDir
  readFile: typeof fs.readFile
  readTextFile: typeof fs.readTextFile
  stat: typeof fs.stat
  lstat: typeof fs.lstat
  exists: typeof fs.exists
  mkdir: typeof fs.mkdir
  create: typeof fs.create
  copyFile: typeof fs.copyFile
  remove: typeof fs.remove
  rename: typeof fs.rename
  truncate: typeof fs.truncate
  writeFile: typeof fs.writeFile
  writeTextFile: typeof fs.writeTextFile
}

export interface IOs {
  platform: typeof os.platform
  arch: typeof os.arch
  exeExtension: typeof os.exeExtension
  family: typeof os.family
  hostname: typeof os.hostname
  eol: () => Promise<string>
  version: typeof os.version
  locale: typeof os.locale
}

export interface IShell {
  execute(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
  ): Promise<shellx.ChildProcess<shellx.IOPayload>>
  kill(pid: number): Promise<void>
  stdinWrite(buffer: string | number[], pid: number): Promise<void>
  open: typeof shellx.open
  makeBashScript: typeof shellx.makeBashScript
  makePowershellScript: typeof shellx.makePowershellScript
  makeAppleScript: typeof shellx.makeAppleScript
  makePythonScript: typeof shellx.makePythonScript
  makeZshScript: typeof shellx.makeZshScript
  makeNodeScript: typeof shellx.makeNodeScript
  executeBashScript: typeof shellx.executeBashScript
  executePowershellScript: typeof shellx.executePowershellScript
  executeAppleScript: typeof shellx.executeAppleScript
  executePythonScript: typeof shellx.executePythonScript
  executeZshScript: typeof shellx.executeZshScript
  executeNodeScript: typeof shellx.executeNodeScript
}

export type FetchOptions = {
  clientConfig: {
    method: string
    url: string
    headers: [string, string][]
    data: number[] | null
    maxRedirections: number | undefined
    connectTimeout: number | undefined
    proxy: Proxy | undefined
  }
}

export interface IFetch {
  rawFetch(options: FetchOptions): Promise<number>
  fetchCancel(rid: number): Promise<void>
  fetchSend(rid: number): Promise<FetchSendResponse>
  fetchReadBody(rid: number): Promise<ArrayBuffer | number[]>
}

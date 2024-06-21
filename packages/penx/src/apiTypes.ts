import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as shellx from 'tauri-plugin-shellx-api'

export interface IDialog {
  ask: (...args: Parameters<typeof dialog.ask>) => ReturnType<typeof dialog.ask>
  confirm: (...args: Parameters<typeof dialog.confirm>) => ReturnType<typeof dialog.confirm>
  message: (...args: Parameters<typeof dialog.message>) => ReturnType<typeof dialog.message>
  open: (options?: dialog.OpenDialogOptions) => ReturnType<typeof dialog.open>
  save: (options?: dialog.SaveDialogOptions) => ReturnType<typeof dialog.save>
}

export interface IClipboard {
  readText: () => Promise<string>
  writeText: (text: string) => Promise<void>
  readImageBase64: () => Promise<string>
  writeImageBase64: (base64: string) => Promise<void>
  readFiles: () => Promise<string[]>
  writeFiles: (files: string[]) => Promise<void>
  readRtf: () => Promise<string>
  writeRtf: (rtf: string) => Promise<void>
  readHtml: () => Promise<string>
  writeHtml: (html: string) => Promise<void>
  writeHtmlAndText: (html: string, text: string) => Promise<void>
  hasText: () => Promise<boolean>
  hasRTF: () => Promise<boolean>
  hasHTML: () => Promise<boolean>
  hasImage: () => Promise<boolean>
  hasFiles: () => Promise<boolean>
}

export interface INotification {
  sendNotification: (
    ...args: Parameters<typeof notification.sendNotification>
  ) => ReturnType<typeof notification.sendNotification>
  requestPermission: () => ReturnType<typeof notification.requestPermission>
  isPermissionGranted: () => ReturnType<typeof notification.isPermissionGranted>
}

export interface IFs {
  readDir: (...args: Parameters<typeof fs.readDir>) => ReturnType<typeof fs.readDir>
  readFile: (...args: Parameters<typeof fs.readFile>) => ReturnType<typeof fs.readFile>
  readTextFile: (...args: Parameters<typeof fs.readTextFile>) => ReturnType<typeof fs.readTextFile>
  stat: (...args: Parameters<typeof fs.stat>) => ReturnType<typeof fs.stat>
  lstat: (...args: Parameters<typeof fs.lstat>) => ReturnType<typeof fs.lstat>
  exists: (...args: Parameters<typeof fs.exists>) => ReturnType<typeof fs.exists>
  mkdir: (...args: Parameters<typeof fs.mkdir>) => ReturnType<typeof fs.mkdir>
  create: (...args: Parameters<typeof fs.create>) => ReturnType<typeof fs.create>
  copyFile: (...args: Parameters<typeof fs.copyFile>) => ReturnType<typeof fs.copyFile>
  remove: (...args: Parameters<typeof fs.remove>) => ReturnType<typeof fs.remove>
  rename: (...args: Parameters<typeof fs.rename>) => ReturnType<typeof fs.rename>
  truncate: (...args: Parameters<typeof fs.truncate>) => ReturnType<typeof fs.truncate>
  writeFile: (...args: Parameters<typeof fs.writeFile>) => ReturnType<typeof fs.writeFile>
  writeTextFile: (...args: Parameters<typeof fs.writeTextFile>) => ReturnType<typeof fs.writeTextFile>
}

export interface IOs {
  platform: () => ReturnType<typeof os.platform>
  arch: () => ReturnType<typeof os.arch>
  exeExtension: () => ReturnType<typeof os.exeExtension>
  family: () => ReturnType<typeof os.family>
  hostname: () => ReturnType<typeof os.hostname>
  eol: () => Promise<string>
  version: () => ReturnType<typeof os.version>
  locale: () => ReturnType<typeof os.locale>
}

export type ShellxExecutePayload = {
  program: string
  args: string[]
  options: shellx.InternalSpawnOptions
}

export interface IShell {
  execute(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
  ): Promise<shellx.ChildProcess<shellx.IOPayload>>
  kill(pid: number): Promise<void>
  stdinWrite(buffer: string | number[], pid: number): Promise<void>
  open(path: string, openWith?: string): Promise<void>
  makeBashScript(script: string): shellx.Command<string>
  makePowershellScript(script: string): shellx.Command<string>
  makeAppleScript(script: string): shellx.Command<string>
  makePythonScript(script: string): shellx.Command<string>
  makeZshScript(script: string): shellx.Command<string>
  makeNodeScript(script: string): shellx.Command<string>
  executeBashScript(script: string): Promise<shellx.ChildProcess<string>>
  executePowershellScript(script: string): Promise<shellx.ChildProcess<string>>
  executeAppleScript(script: string): Promise<shellx.ChildProcess<string>>
  executePythonScript(script: string): Promise<shellx.ChildProcess<string>>
  executeZshScript(script: string): Promise<shellx.ChildProcess<string>>
  executeNodeScript(script: string): Promise<shellx.ChildProcess<string>>
}

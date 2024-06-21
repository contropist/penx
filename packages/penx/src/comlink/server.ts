import * as Comlink from '@huakunshen/comlink'
import { invoke } from '@tauri-apps/api/core'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import * as notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
import * as shellx from 'tauri-plugin-shellx-api'
import { IApi } from './types'

const api: IApi = {
  // Clipboard
  clipboardReadText: clipboard.readText,
  clipboardWriteText: clipboard.writeText,
  clipboardReadImageBase64: clipboard.readImageBase64,
  clipboardWriteImageBase64: clipboard.writeImageBase64,
  clipboardReadFiles: clipboard.readFiles,
  clipboardWriteFiles: clipboard.writeFiles,
  clipboardReadRtf: clipboard.readRtf,
  clipboardWriteRtf: clipboard.writeRtf,
  clipboardReadHtml: clipboard.readHtml,
  clipboardWriteHtml: clipboard.writeHtml,
  clipboardWriteHtmlAndText: clipboard.writeHtmlAndText,
  clipboardHasText: clipboard.hasText,
  clipboardHasRTF: clipboard.hasRTF,
  clipboardHasHTML: clipboard.hasHTML,
  clipboardHasImage: clipboard.hasImage,
  clipboardHasFiles: clipboard.hasFiles,
  // Dialog
  dialogAsk: dialog.ask,
  dialogConfirm: dialog.confirm,
  dialogMessage: dialog.message,
  dialogOpen: dialog.open,
  dialogSave: dialog.save,
  // Notification
  notificationIsPermissionGranted: notification.isPermissionGranted,
  notificationRequestPermission: notification.requestPermission,
  notificationSendNotification: notification.sendNotification,
  // File System
  fsReadDir: fs.readDir,
  fsReadFile: fs.readFile,
  fsReadTextFile: fs.readTextFile,
  fsStat: fs.stat,
  fsLstat: fs.lstat,
  fsExists: fs.exists,
  fsMkdir: fs.mkdir,
  fsCreate: fs.create,
  fsCopyFile: fs.copyFile,
  fsRemove: fs.remove,
  fsRename: fs.rename,
  fsTruncate: fs.truncate,
  fsWriteFile: fs.writeFile,
  fsWriteTextFile: fs.writeTextFile,
  // OS
  osPlatform: os.platform,
  osArch: os.arch,
  osExeExtension: os.exeExtension,
  osFamily: os.family,
  osHostname: os.hostname,
  osEol: () => Promise.resolve(os.eol()),
  osVersion: os.version,
  osLocale: os.locale,
  // Shell
  shellExecute: (
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
  ): Promise<shellx.ChildProcess<shellx.IOPayload>> =>
    invoke<shellx.ChildProcess<shellx.IOPayload>>('plugin:shellx|execute', {
      program: program,
      args: args,
      options: options,
    }),
  shellKill: (pid: number) =>
    invoke<void>('plugin:shellx|kill', {
      cmd: 'killChild',
      pid: pid,
    }),
  shellStdinWrite: (buffer: string | number[], pid: number) =>
    invoke('plugin:shellx|stdin_write', {
      buffer: buffer,
      pid: pid,
    }),
  shellOpen: (path: string, openWith?: string) => shellx.open(path, openWith),
}

/**
 *
 * @param window for example: iframe.contentWindow
 * @returns
 */
export function exposeApiToWindow(win: Window) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}

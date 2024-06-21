import * as Comlink from '@huakunshen/comlink'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import * as notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
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
}

/**
 *
 * @param window for example: iframe.contentWindow
 * @returns
 */
export function exposeApiToWindow(win: Window) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}

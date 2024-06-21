import * as Comlink from '@huakunshen/comlink'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as notification from '@tauri-apps/plugin-notification'
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
}

/**
 *
 * @param window for example: iframe.contentWindow
 * @returns
 */
export function exposeApiToWindow(win: Window) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}

import * as dialog from '@tauri-apps/plugin-dialog'
import notification from '@tauri-apps/plugin-notification'

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

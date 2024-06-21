import { IClipboard, IDialog, IFs, INotification, IOs } from '../apiTypes'

export interface IClipboardApi {
  clipboardReadText: IClipboard['readText']
  clipboardWriteText: IClipboard['writeText']
  clipboardReadImageBase64: IClipboard['readImageBase64']
  clipboardWriteImageBase64: IClipboard['writeImageBase64']
  clipboardReadFiles: IClipboard['readFiles']
  clipboardWriteFiles: IClipboard['writeFiles']
  clipboardReadRtf: IClipboard['readRtf']
  clipboardWriteRtf: IClipboard['writeRtf']
  clipboardReadHtml: IClipboard['readHtml']
  clipboardWriteHtml: IClipboard['writeHtml']
  clipboardWriteHtmlAndText: IClipboard['writeHtmlAndText']
  clipboardHasText: IClipboard['hasText']
  clipboardHasRTF: IClipboard['hasRTF']
  clipboardHasHTML: IClipboard['hasHTML']
  clipboardHasImage: IClipboard['hasImage']
  clipboardHasFiles: IClipboard['hasFiles']
}

export interface INotificationApi {
  notificationSendNotification: INotification['sendNotification']
  notificationRequestPermission: INotification['requestPermission']
  notificationIsPermissionGranted: INotification['isPermissionGranted']
}

export interface IDialogApi {
  dialogAsk: IDialog['ask']
  dialogConfirm: IDialog['confirm']
  dialogMessage: IDialog['message']
  dialogOpen: IDialog['open']
  dialogSave: IDialog['save']
}

export interface IFSApi {
  fsReadDir: IFs['readDir']
  fsReadFile: IFs['readFile']
  fsReadTextFile: IFs['readTextFile']
  fsStat: IFs['stat']
  fsLstat: IFs['lstat']
  fsExists: IFs['exists']
  fsMkdir: IFs['mkdir']
  fsCreate: IFs['create']
  fsCopyFile: IFs['copyFile']
  fsRemove: IFs['remove']
  fsRename: IFs['rename']
  fsTruncate: IFs['truncate']
  fsWriteFile: IFs['writeFile']
  fsWriteTextFile: IFs['writeTextFile']
}

export interface IShellApi {}

export interface IOsApi {
  osPlatform: IOs['platform']
  osArch: IOs['arch']
  osExeExtension: IOs['exeExtension']
  osFamily: IOs['family']
  osHostname: IOs['hostname']
  osEol: IOs['eol']
  osVersion: IOs['version']
  osLocale: IOs['locale']
}

export type IApi = IClipboardApi & INotificationApi & IDialogApi & IFSApi & IShellApi & IOsApi

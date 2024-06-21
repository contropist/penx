import { IClipboard, IDialog } from '../apiTypes'

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

export interface INotificationApi {}

export interface IDialogApi {
  dialogAsk: IDialog['ask']
  dialogConfirm: IDialog['confirm']
  dialogMessage: IDialog['message']
  dialogOpen: IDialog['open']
  dialogSave: IDialog['save']
}

export interface IFSApi {}

export interface IShellApi {}

export type IApi = IClipboardApi & INotificationApi & IDialogApi & IFSApi & IShellApi

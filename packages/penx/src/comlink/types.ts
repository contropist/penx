export interface IClipboard {
  clipboardReadText(): Promise<string>
  clipboardWriteText(text: string): Promise<void>
  clipboardReadImageBase64(): Promise<string>
  clipboardWriteImageBase64(base64: string): Promise<void>
  clipboardReadFiles(): Promise<string[]>
  clipboardWriteFiles(files: string[]): Promise<void>
  clipboardReadRtf(): Promise<string>
  clipboardWriteRtf(rtf: string): Promise<void>
  clipboardReadHtml(): Promise<string>
  clipboardWriteHtml(html: string): Promise<void>
  clipboardWriteHtmlAndText(html: string, text: string): Promise<void>
  clipboardHasText(): Promise<boolean>
  clipboardHasRTF(): Promise<boolean>
  clipboardHasHTML(): Promise<boolean>
  clipboardHasImage(): Promise<boolean>
  clipboardHasFiles(): Promise<boolean>
}

export interface INotification {}

export interface IDialog {}

export interface IFS {}

export interface IShell {}

export type IApi = IClipboard & INotification & IDialog & IFS & IShell

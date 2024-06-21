export interface IClipboard {
  readText(): Promise<string>
  writeText(text: string): Promise<void>
  readImageBase64(): Promise<string>
  writeImageBase64(base64: string): Promise<void>
  readFiles(): Promise<string[]>
  writeFiles(files: string[]): Promise<void>
  readRtf(): Promise<string>
  writeRtf(rtf: string): Promise<void>
  readHtml(): Promise<string>
  writeHtml(html: string): Promise<void>
  writeHtmlAndText(html: string, text: string): Promise<void>
  hasText(): Promise<boolean>
  hasRTF(): Promise<boolean>
  hasHTML(): Promise<boolean>
  hasImage(): Promise<boolean>
  hasFiles(): Promise<boolean>
}

export interface INotification {}

export interface IDialog {}

export interface IFS {}

export interface IShell {}

export interface IApi {
  clipboard: IClipboard
  //   notification: INotification
  //   dialog: IDialog
  //   fs: IFS
  //   shell: IShell
}

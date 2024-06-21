import { iframeSideApi } from './comlink'
import { constructAPI } from './common'
import { EventType } from './constants'

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

export const clipboard: IClipboard = {
  readText: iframeSideApi.clipboardReadText,
  writeText: iframeSideApi.clipboardWriteText,
  readImageBase64: iframeSideApi.clipboardReadImageBase64,
  writeImageBase64: iframeSideApi.clipboardWriteImageBase64,
  readFiles: iframeSideApi.clipboardReadFiles,
  writeFiles: iframeSideApi.clipboardWriteFiles,
  readRtf: iframeSideApi.clipboardReadRtf,
  writeRtf: iframeSideApi.clipboardWriteRtf,
  readHtml: iframeSideApi.clipboardReadHtml,
  writeHtml: iframeSideApi.clipboardWriteHtml,
  writeHtmlAndText: iframeSideApi.clipboardWriteHtmlAndText,
  hasText: iframeSideApi.clipboardHasText,
  hasRTF: iframeSideApi.clipboardHasRTF,
  hasHTML: iframeSideApi.clipboardHasHTML,
  hasImage: iframeSideApi.clipboardHasImage,
  hasFiles: iframeSideApi.clipboardHasFiles,
}

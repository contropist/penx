import { IClipboard } from './apiTypes'
import { iframeSideApi } from './comlink'

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

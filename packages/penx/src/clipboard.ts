import { IClipboard } from './apiTypes'
import { clientApi } from './comlink'

/**
 * This module is clipboard API, enabling you to read and write text, images, files, RTF, and HTML to the clipboard.
 * @example
 * ```ts
 * if (await clipboard.hasText()) {
 *   await clipboard.writeText("Hello World!")
 *   const text = await clipboard.readText()
 * }
 * ```
 */
export const clipboard: IClipboard = {
  readText: clientApi.clipboardReadText,
  writeText: clientApi.clipboardWriteText,
  readImageBase64: clientApi.clipboardReadImageBase64,
  readImageBinary: clientApi.clipboardReadImageBinary,
  writeImageBase64: clientApi.clipboardWriteImageBase64,
  writeImageBinary: clientApi.clipboardWriteImageBinary,
  readFiles: clientApi.clipboardReadFiles,
  writeFiles: clientApi.clipboardWriteFiles,
  readRtf: clientApi.clipboardReadRtf,
  writeRtf: clientApi.clipboardWriteRtf,
  readHtml: clientApi.clipboardReadHtml,
  writeHtml: clientApi.clipboardWriteHtml,
  writeHtmlAndText: clientApi.clipboardWriteHtmlAndText,
  hasText: clientApi.clipboardHasText,
  hasRTF: clientApi.clipboardHasRTF,
  hasHTML: clientApi.clipboardHasHTML,
  hasImage: clientApi.clipboardHasImage,
  hasFiles: clientApi.clipboardHasFiles,
}

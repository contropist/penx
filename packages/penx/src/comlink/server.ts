import * as Comlink from '@huakunshen/comlink'
import clipboard from 'tauri-plugin-clipboard-api'
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
}

/**
 *
 * @param window for example: iframe.contentWindow
 * @returns
 */
export function exposeApiToWindow(win: Window) {
  return Comlink.expose(api, Comlink.windowEndpoint(win))
}

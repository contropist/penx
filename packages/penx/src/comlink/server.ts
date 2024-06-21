import * as Comlink from '@huakunshen/comlink'
import clipboardApi from 'tauri-plugin-clipboard-api'
import { IApi, IClipboard } from './types'

export const clipboard: IClipboard = {
  readText: clipboardApi.readText,
  writeText: clipboardApi.writeText,
  readImageBase64: clipboardApi.readImageBase64,
  writeImageBase64: clipboardApi.writeImageBase64,
  readFiles: clipboardApi.readFiles,
  writeFiles: clipboardApi.writeFiles,
  readRtf: clipboardApi.readRtf,
  writeRtf: clipboardApi.writeRtf,
  readHtml: clipboardApi.readHtml,
  writeHtml: clipboardApi.writeHtml,
  writeHtmlAndText: clipboardApi.writeHtmlAndText,
  hasText: clipboardApi.hasText,
  hasRTF: clipboardApi.hasRTF,
  hasHTML: clipboardApi.hasHTML,
  hasImage: clipboardApi.hasImage,
  hasFiles: clipboardApi.hasFiles,
}

// export const clipboard: IClipboard = clipboardApi

const api: IApi = {
  clipboard,
  // notification: undefined,
  // dialog: undefined,
  // fs: undefined,
  // shell: undefined
}

/**
 *
 * @param window for example: iframe.contentWindow
 * @returns
 */
export function exposeApiToWindow(win: Window) {
  return Comlink.expose(clipboard, Comlink.windowEndpoint(win))
}

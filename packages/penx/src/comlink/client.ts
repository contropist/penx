import * as Comlink from '@huakunshen/comlink'
import { IApi, IClipboard } from './types'

export function getApi(win: Window) {
  return Comlink.wrap<IClipboard>(Comlink.windowEndpoint(win))
}

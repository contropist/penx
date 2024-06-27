import * as Comlink from '@huakunshen/comlink'
import { IApi } from './types'

export function getApi(win: Window) {
  return Comlink.wrap<IApi>(Comlink.windowEndpoint(win))
}

export const isInIframe = window !== window.parent
const iframeSideApi = getApi(window.parent)
export const clientApi = iframeSideApi

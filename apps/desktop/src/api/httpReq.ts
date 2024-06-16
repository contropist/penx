import { fetch } from '@tauri-apps/plugin-http'
import { constructAPIExecuter, EventType } from 'penx'

type FetchParams = Parameters<typeof fetch>

export function handleFetch(event: MessageEvent) {
  return constructAPIExecuter<FetchParams, any>(
    EventType.HttpRequestInited,
    EventType.HttpRequestResult,
    (payload) => {
      //! have to json() before returning, postMessage cannot send Response object which has function
      return fetch(...payload)
        .then((res) => res.json())
        .then((json) => json)
    },
  )(event)
}

import { invoke } from '@tauri-apps/api/core'
import { constructAPIExecuter, EventType, FetchSendResponse, Proxy } from 'penx'

export function handleHttpRawFetch(event: MessageEvent) {
  return constructAPIExecuter<
    {
      clientConfig: {
        method: string
        url: string
        headers: [string, string][]
        data: number[] | null
        maxRedirections: number | undefined
        connectTimeout: number | undefined
        proxy: Proxy | undefined
      }
    },
    number
  >(
    EventType.HttpRawFetch,
    (payload) => invoke<number>('plugin:http|fetch', payload),
    EventType.HttpRawFetch,
  )(event)
}

export function handleHttpFetchCancel(event: MessageEvent) {
  return constructAPIExecuter<{ rid: number }, void>(
    EventType.HttpFetchCancel,
    (payload) => invoke<void>('plugin:http|fetch_cancel', payload),
    EventType.HttpFetchCancel,
  )(event)
}

export function handleHttpFetchSend(event: MessageEvent) {
  return constructAPIExecuter<{ rid: number }, FetchSendResponse>(
    EventType.HttpFetchSend,
    (payload) => invoke<FetchSendResponse>('plugin:http|fetch_send', payload),
    EventType.HttpFetchSend,
  )(event)
}

export function handleHttpReadBody(event: MessageEvent) {
  return constructAPIExecuter<{ rid: number }, ArrayBuffer | number[]>(
    EventType.HttpFetchReadBody,
    (payload) => {
      console.log('http read body payload', payload)

      return invoke<ArrayBuffer | number[]>(
        'plugin:http|fetch_read_body',
        payload,
      )
    },
    EventType.HttpFetchReadBody,
  )(event)
}

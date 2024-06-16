import { invoke } from '@tauri-apps/api/core'
import { EventType } from 'penx'
import { appEmitter } from '@penx/event'
import {
  handleClipboardHasFiles,
  handleClipboardHasHtml,
  handleClipboardHasImage,
  handleClipboardHasRtf,
  handleClipboardHasText,
  handleClipboardReadFiles,
  handleClipboardReadHtml,
  handleClipboardReadImageBase64,
  handleClipboardReadRtf,
  handleClipboardReadText,
  handleClipboardWriteFiles,
  handleClipboardWriteHtml,
  handleClipboardWriteHtmlAndText,
  handleClipboardWriteImageBase64,
  handleClipboardWriteRtf,
  handleClipboardWriteText,
} from '~/api/clipboard'
import {
  handleHttpFetchCancel,
  handleHttpFetchSend,
  handleHttpRawFetch,
  handleHttpReadBody,
} from '~/api/httpReq'
import { handleRunAppleScript } from '~/api/script'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

const handlers = [
  handleRunAppleScript,
  handleClipboardReadText,
  handleClipboardWriteText,
  handleClipboardReadImageBase64,
  handleClipboardWriteImageBase64,
  handleClipboardReadFiles,
  handleClipboardWriteFiles,
  handleClipboardReadRtf,
  handleClipboardWriteRtf,
  handleClipboardHasText,
  handleClipboardHasRtf,
  handleClipboardHasHtml,
  handleClipboardHasImage,
  handleClipboardHasFiles,
  handleClipboardReadHtml,
  handleClipboardWriteHtml,
  handleClipboardWriteHtmlAndText,
  handleHttpRawFetch,
  handleHttpFetchCancel,
  handleHttpFetchSend,
  handleHttpReadBody,
]

export function useWorkerOnMsg() {
  const { setUI } = useCommandAppUI()
  return async (event: MessageEvent<any>) => {
    handlers.forEach((handler) => handler(event))
    // if (event.data.type === EventType.HttpRequestInited) {
    //   // const client = await getClient()
    //   const { json, ...options } = event.data.options

    //   // if (json) {
    //   //   options.body = Body.json(json)
    //   // }

    //   // const response = await client.request(options)
    //   // TODO: test this, not sure if options and response has the same structure
    //   const response = await fetch(options)
    //   event.ports[0].postMessage({
    //     type: EventType.HttpRequestResult,
    //     result: response,
    //   })
    // }

    if (event.data.type === EventType.InitOnSearchChange) {
      appEmitter.on('ON_COMMAND_PALETTE_SEARCH_CHANGE', (v) => {
        event.ports[0].postMessage({
          type: EventType.OnSearchChange,
          value: v,
        })
      })
    }

    if (event.data.type === EventType.InitOnFilterChange) {
      appEmitter.on('ON_COMMAND_PALETTE_FILTER_CHANGE', (v) => {
        event.ports[0].postMessage({
          type: EventType.InitOnFilterChange,
          value: v,
        })
      })
    }

    if (event.data?.type === EventType.Loading) {
      const content = event.data.content as any
      setUI({
        type: 'loading',
        data: content,
      })
    }

    if (
      ['marketplace', 'today', 'clipboard-history'].includes(event.data?.type)
    ) {
      setUI({ type: event.data?.type })
    }

    if (event.data?.type === EventType.Render) {
      const component = event.data.component as any
      setUI({
        type: 'render',
        component,
      })
    }
  }
}

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
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

export function useWorkerOnMsg() {
  const { setUI } = useCommandAppUI()
  return async (event: MessageEvent<any>) => {
    if (event.data.type === EventType.RunAppleScript) {
      const result: string = await invoke('run_applescript', {
        script: event.data.script,
        args: event.data.args,
        options: event.data.options,
      })

      event.ports[0].postMessage({
        type: EventType.RunAppleScriptResult,
        result,
      })
    }
    handleClipboardReadText(event)
    handleClipboardWriteText(event)
    handleClipboardReadImageBase64(event)
    handleClipboardWriteImageBase64(event)
    handleClipboardReadFiles(event)
    handleClipboardWriteFiles(event)
    handleClipboardReadRtf(event)
    handleClipboardWriteRtf(event)
    handleClipboardHasText(event)
    handleClipboardHasRtf(event)
    handleClipboardHasHtml(event)
    handleClipboardHasImage(event)
    handleClipboardHasFiles(event)
    handleClipboardReadHtml(event)
    handleClipboardWriteHtml(event)
    handleClipboardWriteHtmlAndText(event)
    if (event.data.type === EventType.HttpRequestInited) {
      // const client = await getClient()
      const { json, ...options } = event.data.options

      // if (json) {
      //   options.body = Body.json(json)
      // }

      // const response = await client.request(options)
      // TODO: test this, not sure if options and response has the same structure
      const response = await fetch(options)
      event.ports[0].postMessage({
        type: EventType.HttpRequestResult,
        result: response,
      })
    }

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

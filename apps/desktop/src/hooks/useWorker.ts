import { invoke } from '@tauri-apps/api/core'
import { EventType } from 'penx'
import { appEmitter } from '@penx/event'
import {
  handleFilterChange,
  handleSearchChange,
  useHandleLoading,
  useHandleRender,
} from '~/api/app'
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

export function useWorkerOnMsg() {
  const { setUI } = useCommandAppUI()

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
    handleSearchChange,
    handleFilterChange,
    useHandleLoading(setUI),
    useHandleRender(setUI),
  ]
  return async (event: MessageEvent<any>) => {
    if (event.ports.length === 0) {
      console.error('No ports found in message event:', event)
      return
    }
    handlers.forEach((handler) => handler(event))
    if (
      ['marketplace', 'today', 'clipboard-history'].includes(event.data?.type)
    ) {
      setUI({ type: event.data?.type })
    }
  }
}

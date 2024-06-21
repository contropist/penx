import { handleEscape, handleFilterChange, handleSearchChange, useHandleLoading, useHandleRender } from '~/api/app'
import { handleHttpFetchCancel, handleHttpFetchSend, handleHttpRawFetch, handleHttpReadBody } from '~/api/httpReq'
import {
  // handleShellxExecute,
  // handleShellxKill,
  // handleShellxOpen,
  handleShellxSpawn,
  // handleShellxStdinWrite,
} from '~/api/shell'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

export function useOnMessage() {
  const { setUI } = useCommandAppUI()

  const handlers = [
    // web
    handleHttpRawFetch,
    handleHttpFetchCancel,
    handleHttpFetchSend,
    handleHttpReadBody,
    // shellx
    // handleShellxExecute,
    // handleShellxOpen,
    // handleShellxKill,
    // handleShellxStdinWrite,
    handleShellxSpawn,
    // app
    handleSearchChange,
    handleFilterChange,
    handleEscape,
    useHandleLoading(setUI),
    useHandleRender(setUI),
  ]
  return async (event: MessageEvent<any>) => {
    // if (event.ports.length === 0) {
    //   console.error('No ports found in message event:', event)
    //   return
    // }

    handlers.forEach((handler) => handler(event))
  }
}

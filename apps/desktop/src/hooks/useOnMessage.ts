import { handleEscape, handleFilterChange, handleSearchChange, useHandleLoading, useHandleRender } from '~/api/app'
import {
  handleFsCopyFile,
  handleFsCreate,
  handleFsExists,
  handleFsLStat,
  handleFsMkdir,
  handleFsReadDir,
  handleFsReadFile,
  handleFsReadTextFile,
  handleFsRemove,
  handleFsRename,
  handleFsStat,
  handleFsTruncate,
  handleFsWriteFile,
  handleFsWriteTextFile,
} from '~/api/fs'
import { handleHttpFetchCancel, handleHttpFetchSend, handleHttpRawFetch, handleHttpReadBody } from '~/api/httpReq'
import {
  handleOsArch,
  handleOsEol,
  handleOsExeExtension,
  handleOsFamily,
  handleOsHostname,
  handleOsLocale,
  handleOsPlatform,
  handleOsVersion,
} from '~/api/os'
import { handleRunAppleScript } from '~/api/script'
import {
  handleShellxExecute,
  handleShellxKill,
  handleShellxOpen,
  handleShellxSpawn,
  handleShellxStdinWrite,
} from '~/api/shell'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

export function useOnMessage() {
  const { setUI } = useCommandAppUI()

  const handlers = [
    handleRunAppleScript,
    // clipboard
    // web
    handleHttpRawFetch,
    handleHttpFetchCancel,
    handleHttpFetchSend,
    handleHttpReadBody,
    // os
    handleOsPlatform,
    handleOsArch,
    handleOsExeExtension,
    handleOsFamily,
    handleOsHostname,
    handleOsEol,
    handleOsVersion,
    handleOsLocale,
    // fs
    handleFsReadFile,
    handleFsReadTextFile,
    handleFsStat,
    handleFsLStat,
    handleFsStat,
    handleFsLStat,
    handleFsExists,
    handleFsMkdir,
    handleFsCreate,
    handleFsCopyFile,
    handleFsRemove,
    handleFsRename,
    handleFsWriteFile,
    handleFsWriteTextFile,
    handleFsTruncate,
    handleFsReadDir,
    // notification
    // handleNotificationRequestPermission,
    // handleNotificationIsPermissionGranted,
    // handleNotificationSendNotification,
    // shellx
    handleShellxExecute,
    handleShellxOpen,
    handleShellxKill,
    handleShellxStdinWrite,
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

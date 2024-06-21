import { handleEscape, handleFilterChange, handleSearchChange, useHandleLoading, useHandleRender } from '~/api/app'
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
  handleDialogAsk,
  handleDialogConfirm,
  handleDialogMessage,
  handleDialogOpen,
  handleDialogSave,
} from '~/api/dialog'
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
  handleNotificationIsPermissionGranted,
  handleNotificationRequestPermission,
  handleNotificationSendNotification,
} from '~/api/notification'
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
    // handleClipboardReadText,
    // handleClipboardWriteText,
    // handleClipboardReadImageBase64,
    // handleClipboardWriteImageBase64,
    // handleClipboardReadFiles,
    // handleClipboardWriteFiles,
    // handleClipboardReadRtf,
    // handleClipboardWriteRtf,
    // handleClipboardHasText,
    // handleClipboardHasRtf,
    // handleClipboardHasHtml,
    // handleClipboardHasImage,
    // handleClipboardHasFiles,
    // handleClipboardReadHtml,
    // handleClipboardWriteHtml,
    // handleClipboardWriteHtmlAndText,
    // dialog
    // handleDialogAsk,
    // handleDialogConfirm,
    // handleDialogMessage,
    // handleDialogOpen,
    // handleDialogSave,
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
    handleNotificationRequestPermission,
    handleNotificationIsPermissionGranted,
    handleNotificationSendNotification,
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

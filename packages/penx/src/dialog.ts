import * as _dialogApi from '@tauri-apps/plugin-dialog'
import { IDialog } from './apiTypes'
import { iframeSideApi } from './comlink'

export type DialogAskPayload = {
  message: string
  options?: string | _dialogApi.ConfirmDialogOptions
}

export type DialogMessagePayload = {
  message: string
  options?: string | _dialogApi.MessageDialogOptions
}

export type DialogConfirmPayload = {
  message: string
  options?: string | _dialogApi.ConfirmDialogOptions
}

export const dialog: IDialog = {
  ask: iframeSideApi.dialogAsk,
  confirm: iframeSideApi.dialogConfirm,
  message: iframeSideApi.dialogMessage,
  open: iframeSideApi.dialogOpen,
  save: iframeSideApi.dialogSave,
}

import * as _dialogApi from '@tauri-apps/plugin-dialog'
import { IDialog } from './apiTypes'
import { clientApi } from './comlink'

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
  ask: clientApi.dialogAsk,
  confirm: clientApi.dialogConfirm,
  message: clientApi.dialogMessage,
  open: clientApi.dialogOpen,
  save: clientApi.dialogSave,
}

import * as _dialogApi from '@tauri-apps/plugin-dialog'
import { constructAPI } from './common'
import { EventType } from './constants'

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

export interface IDialog {
  ask: (
    ...args: Parameters<typeof _dialogApi.ask>
  ) => ReturnType<typeof _dialogApi.ask>
  confirm: (
    ...args: Parameters<typeof _dialogApi.confirm>
  ) => ReturnType<typeof _dialogApi.confirm>
  message: (
    ...args: Parameters<typeof _dialogApi.message>
  ) => ReturnType<typeof _dialogApi.message>
  open: (
    options?: _dialogApi.OpenDialogOptions,
  ) => ReturnType<typeof _dialogApi.open>
  save: (
    options?: _dialogApi.SaveDialogOptions,
  ) => ReturnType<typeof _dialogApi.save>
}

export const dialog: IDialog = {
  ask: function (
    message: string,
    options?: string | _dialogApi.ConfirmDialogOptions,
  ) {
    return constructAPI<DialogAskPayload, boolean>(EventType.DialogAsk)({
      message,
      options,
    })
  },
  confirm: function (
    message: string,
    options?: string | _dialogApi.ConfirmDialogOptions,
  ) {
    return constructAPI<DialogConfirmPayload, boolean>(EventType.DialogConfirm)(
      { message, options },
    )
  },

  message: function (
    message: string,
    options?: string | _dialogApi.MessageDialogOptions,
  ) {
    return constructAPI<DialogMessagePayload, void>(EventType.DialogMessage)({
      message,
      options,
    })
  },
  open: constructAPI<
    _dialogApi.OpenDialogOptions | undefined,
    ReturnType<typeof _dialogApi.open>
  >(EventType.DialogOpen),
  save: constructAPI<_dialogApi.SaveDialogOptions | undefined, string | null>(
    EventType.DialogSave,
  ),
}

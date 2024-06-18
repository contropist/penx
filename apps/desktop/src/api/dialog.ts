import * as dialog from '@tauri-apps/plugin-dialog'
import {
  ConfirmDialogOptions,
  MessageDialogOptions,
  OpenDialogOptions,
  OpenDialogReturn,
  SaveDialogOptions,
} from '@tauri-apps/plugin-dialog'
import {
  constructAPIExecuter,
  DialogAskPayload,
  DialogConfirmPayload,
  DialogMessagePayload,
  EventType,
} from 'penx'

export function handleDialogAsk(event: MessageEvent) {
  return constructAPIExecuter<DialogAskPayload, boolean>(
    EventType.DialogAsk,
    (payload) => dialog.ask(payload.message, payload.options),
  )(event)
}
export function handleDialogConfirm(event: MessageEvent) {
  return constructAPIExecuter<DialogConfirmPayload, boolean>(
    EventType.DialogConfirm,
    (payload) => dialog.confirm(payload.message, payload.options),
  )(event)
}
export function handleDialogMessage(event: MessageEvent) {
  return constructAPIExecuter<DialogMessagePayload, void>(
    EventType.DialogMessage,
    (payload) => dialog.message(payload.message, payload.options),
  )(event)
}
export function handleDialogOpen<T extends OpenDialogOptions>(
  event: MessageEvent,
) {
  return constructAPIExecuter<T, OpenDialogReturn<T>>(
    EventType.DialogOpen,
    (payload) => dialog.open(payload),
  )(event)
}
export function handleDialogSave(event: MessageEvent) {
  return constructAPIExecuter<SaveDialogOptions | undefined, string | null>(
    EventType.DialogSave,
    (options) => dialog.save(options),
  )(event)
}

import dialog from '@tauri-apps/plugin-dialog'
import { constructAPI } from './common'
import { EventType } from './constants'

type AskParameters = Parameters<typeof dialog.ask>
export type AskPayload = {
  message: AskParameters[0]
  options: AskParameters[1]
}
export const ask = constructAPI<AskPayload, boolean>(EventType.DialogAsk)

type MessageParameters = Parameters<typeof dialog.message>
export type MessagePayload = {
  message: MessageParameters[0]
  options: MessageParameters[1]
}
export const message = constructAPI<MessagePayload, void>(
  EventType.DialogMessage,
)

type ConfirmParameters = Parameters<typeof dialog.confirm>
export type ConfirmPayload = {
  message: ConfirmParameters[0]
  options: ConfirmParameters[1]
}
export const confirm = constructAPI<ConfirmPayload, boolean>(
  EventType.DialogConfirm,
)

type SaveParameters = Parameters<typeof dialog.save>
export type SavePayload = SaveParameters[0]
export const save = constructAPI<SavePayload, string>(EventType.DialogSave)

type OpenParameter = Parameters<typeof dialog.open>
export type OpenPayload = OpenParameter[0]
export const open = constructAPI<OpenPayload, dialog.OpenDialogReturn<any>>(
  EventType.DialogOpen,
)

import * as _dialogApi from '@tauri-apps/plugin-dialog'
import { IDialog } from './apiTypes'
import { clientApi } from './comlink'

/**
 * @example
 * ```ts
 * const ans = await dialog.ask('Are you sure')
 * ```
 */
export const dialog: IDialog = {
  ask: clientApi.dialogAsk,
  confirm: clientApi.dialogConfirm,
  message: clientApi.dialogMessage,
  open: clientApi.dialogOpen,
  save: clientApi.dialogSave,
}

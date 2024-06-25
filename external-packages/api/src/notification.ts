import * as Comlink from '@huakunshen/comlink'
import { PluginListener } from '@tauri-apps/api/core'
import notificationApi from '@tauri-apps/plugin-notification'
import { INotification } from './apiTypes'
import { clientApi } from './comlink'

/**
 * @example
 * ```ts
 * console.log(await notification.isPermissionGranted())
 * notification.sendNotification('Hello from huakun')
 * ```
 */
export const notification: INotification = {
  sendNotification: clientApi.notificationSendNotification,
  requestPermission: clientApi.notificationRequestPermission,
  isPermissionGranted: clientApi.notificationIsPermissionGranted,
  registerActionTypes: clientApi.notificationRegisterActionTypes,
  // this may not work
  pending: clientApi.notificationPending,
  cancel: clientApi.notificationCancel,
  cancelAll: clientApi.notificationCancelAll,
  // this may not work
  active: clientApi.notificationActive,
  removeActive: clientApi.notificationRemoveActive,
  removeAllActive: clientApi.notificationRemoveAllActive,
  createChannel: clientApi.notificationCreateChannel,
  removeChannel: clientApi.notificationRemoveChannel,
  channels: clientApi.notificationChannels,
  // this may not work
  onNotificationReceived: (
    cb: (notification: notificationApi.Options) => void,
  ): Promise<PluginListener> => {
    return clientApi.notificationOnNotificationReceived(Comlink.proxy(cb))
  },
  // this may not work
  onAction: (cb: (notification: notificationApi.Options) => void): Promise<PluginListener> => {
    return clientApi.notificationOnAction(Comlink.proxy(cb))
  },
}

import notificationApi from '@tauri-apps/plugin-notification'
import { constructAPI } from './common'
import { EventType } from './constants'
import { UnwrapPromise } from './type'

// notificationApi.requestPermission
// notificationApi.isPermissionGranted
// notificationApi.channels
// notificationApi.createChannel
// notificationApi.removeChannel
// notificationApi.active
// notificationApi.

export interface INotification {
  sendNotification: (
    ...args: Parameters<typeof notificationApi.sendNotification>
  ) => ReturnType<typeof notificationApi.sendNotification>

  requestPermission: () => ReturnType<typeof notificationApi.requestPermission>

  isPermissionGranted: () => ReturnType<
    typeof notificationApi.isPermissionGranted
  >
}

export class Notification implements INotification {
  sendNotification(options: string | notificationApi.Options) {
    return constructAPI<
      string | notificationApi.Options,
      UnwrapPromise<ReturnType<typeof notificationApi.sendNotification>>
    >(EventType.NotificationSendNotification)(options)
  }
  requestPermission() {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof notificationApi.requestPermission>>
    >(EventType.NotificationRequestPermission)()
  }
  isPermissionGranted() {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof notificationApi.isPermissionGranted>>
    >(EventType.NotificationIsPermissionGranted)()
  }
}

export const notificaiton = new Notification()

import { INotification } from './apiTypes'
import { clientApi } from './comlink'

export const notification: INotification = {
  sendNotification: clientApi.notificationSendNotification,
  requestPermission: clientApi.notificationRequestPermission,
  isPermissionGranted: clientApi.notificationIsPermissionGranted,
}

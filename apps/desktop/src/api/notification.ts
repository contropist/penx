// import * as notification from '@tauri-apps/plugin-notification'
// import { constructAPIExecuter, EventType } from 'penx'

// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// export function handleNotificationRequestPermission(event: MessageEvent) {
//   return constructAPIExecuter<
//     undefined,
//     UnwrapPromise<ReturnType<typeof notification.requestPermission>>
//   >(EventType.NotificationRequestPermission, () =>
//     notification.requestPermission(),
//   )(event)
// }

// export function handleNotificationIsPermissionGranted(event: MessageEvent) {
//   return constructAPIExecuter<
//     undefined,
//     UnwrapPromise<ReturnType<typeof notification.isPermissionGranted>>
//   >(EventType.NotificationIsPermissionGranted, () =>
//     notification.isPermissionGranted(),
//   )(event)
// }

// export function handleNotificationSendNotification(event: MessageEvent) {
//   return constructAPIExecuter<
//     string | notification.Options,
//     ReturnType<typeof notification.sendNotification>
//   >(EventType.NotificationSendNotification, (payload) =>
//     Promise.resolve(notification.sendNotification(payload)),
//   )(event)
// }

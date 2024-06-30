import { invoke } from '@tauri-apps/api/core'
import { AppInfo } from '../models'

export function getAllApps() {
  return invoke<AppInfo[]>('plugin:jarvis|get_applications')
}

export function refreshApplicationsList() {
  return invoke<void>('plugin:jarvis|refresh_applications_list')
}

export function refreshApplicationsListInBg() {
  return invoke<void>('plugin:jarvis|refresh_applications_list_in_bg')
}

// export function convertAppToTListItem(app: AppInfo): TListItem {
//   return {
//     title: app.name,
//     value: app.app_desktop_path,
//     description: "",
//     type: "Application",
//     icon: null,
//     keywords: app.name.split(" "),
//   };
// }

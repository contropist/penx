import { invoke } from '@tauri-apps/api/core'

export function startServer() {
  return invoke<void>('plugin:jarvis|start_server')
}

export function stopServer() {
  return invoke<void>('plugin:jarvis|stop_server')
}

export function restartServer() {
  return invoke<void>('plugin:jarvis|restart_server')
}

export function serverIsRunning() {
  return invoke<boolean>('plugin:jarvis|server_is_running')
}

export function setDevExtensionFolder(devExtFolder: string | undefined) {
  return invoke<void>('plugin:jarvis|set_dev_extension_folder', {
    devExtFolder,
  })
}

export function setExtensionFolder(extFolder: string | undefined) {
  return invoke<void>('plugin:jarvis|set_extension_folder', { extFolder })
}

export function getExtensionFolder() {
  return invoke<string | null>('plugin:jarvis|get_extension_folder')
}

export function getDevExtensionFolder() {
  return invoke<string | null>('plugin:jarvis|get_dev_extension_folder')
}

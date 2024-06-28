import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'
import { positionAtom } from '~/hooks/useCommandPosition'
import { initApplicationCommands } from './initApplicationCommands'

const isDev = import.meta.env.MODE === 'development'

export async function handleEscape() {
  const appWindow = getCurrent()
  const mainWindow = WebviewWindow.getByLabel('main')

  document.addEventListener('keydown', async (event) => {
    if (event.key === 'Escape') {
      const position = store.get(positionAtom)
      if (position === 'ROOT') {
        mainWindow?.hide()
      } else {
        appEmitter.emit('ON_ESCAPE_IN_COMMAND')
      }
    }
  })

  // TODO: move this logic to other files

  listen('tauri://blur', () => {
    if (!isDev) {
      appWindow.hide()
    }
  })

  listen('tauri://focus', () => {
    initApplicationCommands()
  })
}

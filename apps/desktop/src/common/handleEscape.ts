import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'
import { appModeAtom } from '~/hooks/useAppMode'
import { positionAtom } from '~/hooks/useCommandPosition'

const isDev = import.meta.env.MODE === 'development'

export async function handleEscape() {
  const appWindow = getCurrent()
  const mainWindow = WebviewWindow.getByLabel('main')

  document.addEventListener('keydown', async (event) => {
    const mode = store.get(appModeAtom)

    if (event.key === 'Escape') {
      if (mode === 'EDITOR') {
        await invoke('set_window_properties', {
          resizable: false,
          width: 750.0,
          height: 470.0,
          focus: true,
        })
        await appWindow?.center()
        store.set(appModeAtom, 'COMMAND')
      } else {
        const position = store.get(positionAtom)
        if (position === 'ROOT') {
          mainWindow?.hide()
        } else {
          appEmitter.emit('ON_ESCAPE_IN_COMMAND')
        }
      }
    }
  })

  listen('tauri://blur', () => {
    if (!isDev) {
      const mode = store.get(appModeAtom)
      if (mode === 'COMMAND') {
        appWindow.hide()
      }
    }
  })
}

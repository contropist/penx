import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker } from '@penxio/api'
import { invoke } from '@tauri-apps/api/core'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { themeModeAtom } from '@penx/hooks'
import { db } from '@penx/local-db'
import { store } from '@penx/store'
import { createBuiltinWorker } from '~/common/createBuiltinWorker'
import { createCommandWorker } from '~/common/createCommandWorker'
import { ICommandItem } from '~/common/types'
import { workerStore } from '~/common/workerStore'
import { commandUIAtom } from '../hooks/useCommandAppUI'
import { positionAtom } from '../hooks/useCommandPosition'
import { currentCommandAtom } from '../hooks/useCurrentCommand'
import { currentDatabaseAtom } from '../hooks/useCurrentDatabase'
import { searchAtom } from '../hooks/useSearch'
import { handleOnMessage } from './handleOnMessage'

function handleBuiltinCommand(item: ICommandItem) {
  if (
    ['marketplace', 'installed-extensions', 'about', 'settings'].includes(item.data.commandName)
  ) {
    store.set(searchAtom, '')
    store.set(currentCommandAtom, item)
    store.set(positionAtom, 'COMMAND_APP')
    store.set(commandUIAtom, { type: item.data.commandName as any })

    appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
    return true
  }
  return false
}

export async function handleSelect(item: ICommandItem, input = '') {
  const handled = handleBuiltinCommand(item)
  if (handled) return

  if (item.data?.type === 'Database') {
    store.set(positionAtom, 'COMMAND_APP')
    store.set(searchAtom, '')
    store.set(currentCommandAtom, item)
    store.set(currentDatabaseAtom, item.data.database)
    store.set(commandUIAtom, { type: 'database' })

    appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
    return
  }

  if (item.data?.type === 'Application') {
    const { applicationPath } = item.data
    store.set(searchAtom, '')
    await invoke('open_command', { path: applicationPath })

    const appWindow = getCurrent()
    await appWindow.hide()
  }

  if (item.data?.type === 'Command') {
    store.set(currentCommandAtom, item)
    store.set(searchAtom, '')
    store.set(positionAtom, 'COMMAND_APP')

    appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')

    const ext = await db.getExtensionByName(item.data.extensionSlug)
    if (!ext) return

    const command = ext.commands.find((c) => c.name === item.data.commandName)!

    if (command.mode === 'custom-ui') {
      const $iframe = document.getElementById('command-app-iframe')! as HTMLIFrameElement
      if (!$iframe) return
      const currentWindow = $iframe.contentWindow as Window
      exposeApiToWindow(currentWindow, {}) // TODO:
      const theme = store.get(themeModeAtom)
      currentWindow.document.documentElement.className = theme

      // TODO: dark mode splash bug in iframe
      currentWindow.document.body.style.background = theme === 'dark' ? '#171717' : 'white'
      currentWindow.document.body.innerHTML = '<div id="root"></div>'

      // TODO: window.__COMMAND__  is too hack
      ;(currentWindow as any).eval(
        `window.__COMMAND__ = ${JSON.stringify(item)} \n ${command.code}`,
      )

      return
    }

    // run time
    let worker: Worker
    if (command.isBuiltIn) {
      worker = createBuiltinWorker(command)
    } else {
      worker = createCommandWorker(command, input)
      exposeApiToWorker(worker, defaultServerAPI)
    }

    workerStore.currentWorker = worker

    item.data.commandName && worker.postMessage(item.data.commandName)
    worker.addEventListener('message', handleOnMessage)
  }
}

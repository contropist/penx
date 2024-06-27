import { defaultServerAPI, exposeApiToWindow, exposeApiToWorker } from '@penxio/api'
import { invoke } from '@tauri-apps/api/core'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { themeModeAtom } from '@penx/hooks'
import { Command } from '@penx/model'
import { store } from '@penx/store'
import { createBuiltinWorker } from '~/common/createBuiltinWorker'
import { createCommandWorker } from '~/common/createCommandWorker'
import { handleOnMessage } from '~/common/handleOnMessage'
import { workerStore } from '~/common/workerStore'
import { commandUIAtom } from '~/hooks/useCommandAppUI'
import { positionAtom } from '~/hooks/useCommandPosition'
import { currentCommandAtom } from '~/hooks/useCurrentCommand'
import { currentDatabaseAtom } from '~/hooks/useCurrentDatabase'
import { searchAtom } from '~/hooks/useSearch'

export class CommandService {
  constructor(public command: Command) {}
  //

  async handleSelect() {
    const handled = this.handleBuiltinCommand()
    if (handled) return
    //

    if (this.command.isDatabase) {
      return this.selectDatabase()
    }

    if (this.command.isApplication) {
      return await this.selectApplication()
    }

    if (this.command.isCommand) {
      this.selectCommand()
    }
  }

  private handleBuiltinCommand() {
    const item = this.command
    if (['marketplace', 'installed-extensions', 'about', 'settings'].includes(item.name)) {
      store.set(searchAtom, '')
      store.set(currentCommandAtom, item)
      store.set(positionAtom, 'COMMAND_APP')
      store.set(commandUIAtom, { type: item.name as any })

      appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
      return true
    }
    return false
  }

  private selectDatabase() {
    const item = this.command
    store.set(positionAtom, 'COMMAND_APP')
    store.set(searchAtom, '')
    store.set(currentCommandAtom, item)
    store.set(currentDatabaseAtom, item.database)
    store.set(commandUIAtom, { type: 'database' })

    appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
    return
  }

  private async selectApplication() {
    const item = this.command
    const { applicationPath } = item
    store.set(searchAtom, '')
    await invoke('open_command', { path: applicationPath })

    const appWindow = getCurrent()
    await appWindow.hide()
  }

  private selectCommand() {
    store.set(currentCommandAtom, this.command)
    store.set(searchAtom, '')
    store.set(positionAtom, 'COMMAND_APP')

    appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
    //
    if (this.command.mode === 'preset-ui') {
      this.selectPresetUI()
    } else {
      this.selectCustomUI()
    }
  }

  private selectPresetUI() {
    const command = this.command
    // run time
    let worker: Worker
    if (this.command.commandRaw.isBuiltIn) {
      worker = createBuiltinWorker(command)
    } else {
      worker = createCommandWorker(command, '')
      exposeApiToWorker(worker, defaultServerAPI)
    }

    workerStore.currentWorker = worker

    command.name && worker.postMessage(command.name)
    worker.addEventListener('message', handleOnMessage)
  }

  private selectCustomUI() {
    const command = this.command
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
      `window.__COMMAND__ = ${JSON.stringify(command)} \n ${command.code}`,
    )
  }
}

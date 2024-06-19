import { invoke } from '@tauri-apps/api/core'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { db } from '@penx/local-db'
import { ICommandItem } from '~/common/types'
import { useCommandAppLoading } from './useCommandAppLoading'
import { useCommandAppUI } from './useCommandAppUI'
import { useCommandPosition } from './useCommandPosition'
import { useCurrentCommand } from './useCurrentCommand'
import { useCurrentDatabase } from './useCurrentDatabase'
import { useSearch } from './useSearch'

export function useHandleSelect() {
  const { setUI } = useCommandAppUI()
  const { setPosition } = useCommandPosition()
  const { setCurrentCommand } = useCurrentCommand()
  const { setDatabase } = useCurrentDatabase()
  const { setLoading } = useCommandAppLoading()
  const { setSearch } = useSearch()

  return async (item: ICommandItem, input = '') => {
    if (item.data.commandName === 'marketplace') {
      setSearch('')
      setCurrentCommand(item)
      setUI({ type: 'marketplace' })
      setPosition('COMMAND_APP')

      appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
      return
    }

    if (item.data?.type === 'Database') {
      setSearch('')
      setDatabase(item.data.database)
      setCurrentCommand(item)
      setUI({ type: 'database' })
      setPosition('COMMAND_APP')

      appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
      return
    }

    if (item.data?.type === 'Application') {
      const { applicationPath } = item.data
      setSearch('')
      await invoke('open_command', { path: applicationPath })

      const appWindow = getCurrent()
      await appWindow.hide()
    }

    if (item.data?.type === 'Command') {
      setSearch('')
      setLoading(true)
      setCurrentCommand(item)

      setPosition('COMMAND_APP')

      appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')

      const ext = await db.getExtensionByName(item.data.extensionSlug)
      if (!ext) return

      const command = ext.commands.find(
        (c) => c.name === item.data.commandName,
      )!

      if (command.runtime === 'iframe') {
        const $iframe = document.getElementById('command-app-iframe')!
        if (!$iframe) return
        const currentWindow = ($iframe as any).contentWindow as Window

        currentWindow.document.body.innerHTML = '<div id="root"></div>'

        // TODO: window.__COMMAND__  is too hack
        ;(currentWindow as any).eval(
          `window.__COMMAND__ = ${JSON.stringify(item)} \n ${command.code}`,
        )

        return
      }
    }
  }
}

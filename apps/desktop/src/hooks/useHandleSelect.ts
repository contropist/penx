import { Body, getClient } from '@tauri-apps/api/http'
import { invoke } from '@tauri-apps/api/tauri'
import { EventType } from 'penx'
import clipboard from 'tauri-plugin-clipboard-api'
import { appEmitter } from '@penx/event'
import { db } from '@penx/local-db'
import { ICommandItem } from '~/common/types'
import { workerStore } from '~/common/workerStore'
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
    if (item.type === 'command') {
      setSearch('')
      setLoading(true)
      setCurrentCommand(item)

      setPosition('COMMAND_APP')

      appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')

      if (item.data?.type === 'Database') {
        setDatabase(item.data.database)
        setUI({ type: 'database' })
        return
      }

      const ext = await db.getExtensionBySlug(item.data.extensionSlug)
      if (!ext) return

      const command = ext.commands.find(
        (c) => c.name === item.data.commandName,
      )!

      if (command.runtime === 'iframe') {
        const $iframe = document.getElementById('command-app-iframe')!
        if (!$iframe) return
        const currentWindow = ($iframe as any).contentWindow as Window

        currentWindow.document.body.innerHTML = '<div id="root"></div>'
        ;(currentWindow as any).eval(command.code)

        return
      }

      let worker: Worker
      if (command.isBuiltIn) {
        // console.log('name........:', command)

        if (command.name === 'clipboard-history') {
          worker = new Worker(
            new URL('../workers/clipboard-history.ts', import.meta.url),
            { type: 'module' },
          )
        } else if (command.name === 'today') {
          worker = new Worker(new URL('../workers/today.ts', import.meta.url), {
            type: 'module',
          })
        } else if (command.name === 'database') {
          worker = new Worker(
            new URL('../workers/database.ts', import.meta.url),
            { type: 'module' },
          )
        } else {
          worker = new Worker(
            new URL('../workers/marketplace.ts', import.meta.url),
            { type: 'module' },
          )
        }
      } else {
        // console.log('=========command?.code:, ', command?.code)

        const extraCode = `
          self.onmessage = (event) => {
            if (event.data === 'BACK_TO_ROOT') {
              self.close()
            }
          }
          self.input = '${input}';
        `

        let blob = new Blob([command?.code + extraCode], {
          type: 'application/javascript',
        })
        const url = URL.createObjectURL(blob)
        worker = new Worker(url)
      }
      setLoading(false)

      workerStore.currentWorker = worker

      // worker.terminate()

      item.data.commandName && worker.postMessage(item.data.commandName)

      worker.onmessage = async (event: MessageEvent<any>) => {
        if (event.data.type === EventType.RunAppScript) {
          const result = await invoke('run_applescript', {
            script: event.data.script,
            human_readable_output: true,
          })

          event.ports[0].postMessage({
            type: EventType.RunAppScriptResult,
            result,
          })
        }

        if (event.data.type === EventType.HttpRequestInited) {
          const client = await getClient()
          const { json, ...options } = event.data.options

          if (json) {
            options.body = Body.json(json)
          }

          const response = await client.request(options)

          event.ports[0].postMessage({
            type: EventType.HttpRequestResult,
            result: response,
          })
        }

        if (event.data.type === EventType.InitOnSearchChange) {
          appEmitter.on('ON_COMMAND_PALETTE_SEARCH_CHANGE', (v) => {
            event.ports[0].postMessage({
              type: EventType.OnSearchChange,
              value: v,
            })
          })
        }

        if (event.data.type === EventType.InitOnFilterChange) {
          appEmitter.on('ON_COMMAND_PALETTE_FILTER_CHANGE', (v) => {
            event.ports[0].postMessage({
              type: EventType.InitOnFilterChange,
              value: v,
            })
          })
        }

        if (event.data?.type === EventType.Loading) {
          const content = event.data.content as any
          setUI({
            type: 'loading',
            data: content,
          })
        }

        if (
          ['marketplace', 'today', 'clipboard-history'].includes(
            event.data?.type,
          )
        ) {
          setUI({ type: event.data?.type })
        }

        if (event.data?.type === EventType.Render) {
          const component = event.data.component as any
          setUI({
            type: 'render',
            component,
          })
        }
      }
    }

    if (item.type === 'list-item') {
      if (item.actions?.[0]) {
        const defaultAction = item.actions?.[0]
        if (defaultAction.type === 'OpenInBrowser') {
          // console.log('========defaultAction.url:', defaultAction.url)
          open(defaultAction.url)
        }

        if (defaultAction.type === 'CopyToClipboard') {
          await clipboard.writeText(defaultAction.content)
        }
      }
      console.log('list item:', item)
    }
  }
}

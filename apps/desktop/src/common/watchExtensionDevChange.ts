import { listen } from '@tauri-apps/api/event'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { db } from '@penx/local-db'
import { store } from '@penx/store'
import { createCommandWorker } from '~/common/createCommandWorker'
import { handleOnMessage } from '~/hooks/handleOnMessage'
import { currentCommandAtom } from '~/hooks/useCurrentCommand'
import { workerStore } from './workerStore'

type Payload = {
  code: string
  commands: string
  assets: string
  name: string
  title: string
  icon: string
  version: string
}

export async function watchExtensionDevChange() {
  const appWindow = getCurrent()

  if (appWindow.label !== 'main') return

  listen('UPSERT_EXTENSION', async (data) => {
    const payload = data.payload as Payload
    const commands = JSON.parse(payload.commands || '[]')
    const assets = JSON.parse(payload.assets || '{}')

    // console.log('======payload:', payload)
    // console.log('========commands:', commands)

    const getIcon = () => {
      try {
        const icon = JSON.parse(payload.icon)
        return typeof icon === 'object' ? icon : payload.icon
      } catch (error) {
        return payload.icon
      }
    }

    await db.upsertExtension(payload.name, {
      isDeveloping: true,
      title: payload.title,
      commands,
      assets,
      icon: getIcon(),
      version: payload.version,
    })

    const item = store.get(currentCommandAtom)

    const ext = await db.getExtensionByName(item.data.extensionSlug)
    if (!ext) return

    const command = ext.commands.find((c) => c.name === item.data.commandName)!

    // worker hot reload
    if (workerStore.currentWorker) {
      workerStore.currentWorker.terminate()

      workerStore.currentWorker = createCommandWorker(command)

      workerStore.currentWorker.addEventListener('message', handleOnMessage)
    }

    // iframe hot reload
    if (command.mode === 'custom-ui') {
      const $iframe = document.getElementById('command-app-iframe')!
      if (!$iframe) return
      const currentWindow = ($iframe as any).contentWindow as Window

      currentWindow.document.body.innerHTML = '<div id="root"></div>'
      ;(currentWindow as any).eval(command.code)
    }
  })
}

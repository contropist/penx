import { listen } from '@tauri-apps/api/event'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { db } from '@penx/local-db'

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

    await db.upsertExtension(payload.name, {
      isDeveloping: true,
      title: payload.title,
      commands,
      assets,
      icon: payload.icon,
      version: payload.version,
    })
  })
}

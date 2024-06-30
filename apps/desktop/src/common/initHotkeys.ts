import { db } from '@penx/local-db'
import { convertKeysToHotkey, registerCommandHotkey } from './hotkey.util'

export async function initHotkeys() {
  const extensions = await db.listExtensions()

  for (const ext of extensions) {
    const { commands } = ext

    for (const command of commands) {
      if (!command.hotkey) continue

      const hotkey = convertKeysToHotkey(command.hotkey)
      await registerCommandHotkey(ext, command, hotkey)
    }
  }
}

import { db } from '@penx/local-db'
import { registerCommandHotkey } from './hotkey.util'

export async function initHotkeys() {
  const extensions = await db.listExtensions()

  for (const ext of extensions) {
    const { commands } = ext

    for (const command of commands) {
      if (!command.hotkey) continue
      console.log('======....', command.hotkey, command)
      await registerCommandHotkey(ext, command, command.hotkey!)
    }
  }
}

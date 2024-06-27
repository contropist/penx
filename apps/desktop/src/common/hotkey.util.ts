import { getCurrent } from '@tauri-apps/api/window'
import { isRegistered, register, unregister } from '@tauri-apps/plugin-global-shortcut'
import { Command } from '@penx/model'
import { ICommand, IExtension } from '@penx/model-types'
import { CommandService } from '~/services/CommandService'
import { isIconify } from './isIconify'

export async function unregisterHotkey(hotkey: string) {
  try {
    await unregister(hotkey)
  } catch (error) {
    console.error(error)
  }
}

export function convertKeysToHotkey(keys: string[]) {
  return keys
    .map((k) => {
      if (k === 'Meta') return 'Command'
      return k
    })
    .join('+')
}

export async function registerCommandHotkey(
  extension: IExtension,
  command: ICommand,
  keys: string[],
) {
  const hotkey = convertKeysToHotkey(keys)

  if (await isRegistered(hotkey)) {
    await unregisterHotkey(hotkey)
  }

  await register(hotkey, async (event) => {
    const appWindow = getCurrent()
    if (event.state === 'Pressed') {
      const isFocused = await appWindow?.isFocused()

      if (!isFocused) {
        await appWindow?.show()
        // await appWindow?.center()
        await appWindow?.setFocus()

        setTimeout(() => {
          document.getElementById('searchBarInput')?.focus()
        }, 0)
      }

      const commandService = new CommandService(Command.formExtension(extension, command))

      commandService.handleSelect()
    }
  })
}

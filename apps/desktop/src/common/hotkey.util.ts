import { isRegistered, register, unregister } from '@tauri-apps/plugin-global-shortcut'
import { Command, IExtension } from '@penx/model-types'
import { handleSelect } from './handleSelect'
import { isIconify } from './isIconify'
import { ICommandItem } from './types'

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
  command: Command,
  keys: string[],
) {
  const hotkey = convertKeysToHotkey(keys)

  if (await isRegistered(hotkey)) {
    await unregisterHotkey(hotkey)
  }

  await register(hotkey, async (event) => {
    if (event.state === 'Pressed') {
      function getIcon() {
        if (!extension.icon) {
          return command.icon
        }

        if (isIconify(extension.icon)) return extension.icon

        if (typeof extension.icon === 'string') {
          if (extension.icon?.startsWith('/')) return extension.icon
          const commandIcon = extension.assets?.[extension.icon]
          return commandIcon
        }
        return ''
      }

      handleSelect({
        type: 'list-item',
        title: command.title,
        subtitle: extension.title,
        icon: getIcon() as any, // TODO: handle any
        keywords: [],
        data: {
          type: 'Command',
          alias: command.alias,
          assets: extension.assets,
          filters: command.filters,
          mode: command.mode,
          commandName: command.name,
          extensionSlug: extension.name,
          extensionIcon: extension.assets?.[extension.icon as string],
          isDeveloping: extension.isDeveloping,
        } as ICommandItem['data'],
      })
    }
  })
}

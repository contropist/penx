import { getAllApps, refreshApplicationsList } from 'tauri-plugin-jarvis-api/commands'
import { db } from '@penx/local-db'
import { ICommand } from '@penx/model-types'

export async function initApplicationCommands() {
  const ext = await db.getExtensionByName('penx/applications')
  if (!ext) return

  await refreshApplicationsList()
  const allApps = await getAllApps()

  const applicationCommands = allApps
    // TODO: improve filters
    .filter((i) => {
      if (i.app_desktop_path.startsWith('/System/Library/')) {
        return false
      }

      if (i.app_desktop_path.startsWith('/Library/Application Support/')) {
        return false
      }
      return true
    })
    .map((appInfo) => {
      return {
        name: appInfo.app_desktop_path,
        title: appInfo.name,
        subtitle: appInfo.name,
        source: 'application',
        icon: appInfo.icon_path,
        description: '',
        code: '',
        data: {
          app_path_exe: appInfo.app_path_exe,
        },
      } as ICommand
    })

    .sort((a, b) => {
      const nameA = a.name.split('/').pop()!
      const nameB = b.name.split('/').pop()!
      const isChineseA = /[\u4e00-\u9fa5]/.test(nameA)
      const isChineseB = /[\u4e00-\u9fa5]/.test(nameB)

      if (isChineseA && !isChineseB) return 1
      if (!isChineseA && isChineseB) return -1

      return nameA.localeCompare(nameB)
    })

  if (!ext.commands?.length) {
    await db.updateExtension(ext.id, {
      commands: applicationCommands,
    })
  } else {
    // save old alias and hotkey settings
    const map = ext.commands.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.name]: { alias: cur.alias, hotkey: cur.hotkey },
        }
      },
      {} as Record<string, { alias?: string; hotkey?: string[] }>,
    )

    for (const item of applicationCommands) {
      item.alias = map[item.name]?.alias
      item.hotkey = map[item.name]?.hotkey
    }

    await db.updateExtension(ext.id, {
      commands: applicationCommands,
    })
  }
}

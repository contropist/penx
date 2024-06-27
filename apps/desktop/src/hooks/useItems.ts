import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'
import { atom, useAtom, useSetAtom } from 'jotai'
import { getAllApps, refreshApplicationsList } from 'tauri-plugin-jarvis-api/commands'
import { AppInfo } from 'tauri-plugin-jarvis-api/models'
import { db } from '@penx/local-db'
import { Command, Node } from '@penx/model'
import { useSearch } from './useSearch'

export const itemsAtom = atom<Command[]>([])

export function useItems() {
  const { search } = useSearch()
  const [items, setItems] = useAtom(itemsAtom)
  return {
    items,
    developingItems: items
      .filter((i) => i.isDeveloping)
      .filter((i) => {
        if (!search) return true
        if (i.alias) {
          if (i.alias.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
        }
        return i.title.toString().toLowerCase().includes(search.toLowerCase())
      }),

    commandItems: items
      .filter((i) => !i.isDeveloping && i.isCommand)
      .filter((i) => {
        if (!search) return true
        if (i.alias) {
          if (i.alias.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
        }
        return i.title.toString().toLowerCase().includes(search.toLowerCase())
      }),

    databaseItems: items
      .filter((i) => i.isDatabase)
      .filter((i) => {
        if (!search) return true
        if (i.alias) {
          if (i.alias.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
        }
        return i.title.toString().toLowerCase().includes(search.toLowerCase())
      }),

    applicationItems: items
      .filter((i) => i.isApplication)
      .filter((i) => {
        if (!search) return true
        if (i.alias) {
          if (i.alias.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
        }
        return i.title.toString().toLowerCase().includes(search.toLowerCase())
      }),

    setItems,
  }
}

export const commandsAtom = atom<Command[]>([])

export function useCommands() {
  const [commands, setCommands] = useAtom(itemsAtom)
  return { commands, setCommands }
}

export function useLoadCommands() {
  return useQuery({
    queryKey: ['commands'],
    queryFn: async () => {
      try {
        await refreshApplicationsList()
        // const [extensions, databases, applicationsRes, entries] =
        const [extensions, databases, applicationsRes, allApps] = await Promise.all([
          db.listExtensions(),
          db.listDatabases(),
          invoke('handle_input', {
            input: '',
          }) as Promise<any[]>,
          getAllApps(),
        ])

        const commands = extensions.reduce((acc, cur) => {
          return [...acc, ...cur.commands.map((item) => Command.formExtension(cur, item))]
        }, [] as Command[])

        const databaseItems = databases.reduce((acc, item) => {
          const node = new Node(item)
          if (node.isSpecialDatabase) return acc
          return [...acc, Command.formDatabase(item)]
        }, [] as Command[])

        const applicationItems = allApps
          .filter((i) => {
            if (i.app_desktop_path.startsWith('/System/Library/')) {
              return false
            }

            if (i.app_desktop_path.startsWith('/Library/Application Support/')) {
              return false
            }
            return true
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
          .map((appInfo: AppInfo) => Command.formApp(appInfo))

        return [...commands, ...databaseItems, ...applicationItems]
      } catch (error) {
        console.log('==============error:', error)

        return []
      }
    },
  })
}

export function useQueryCommands() {
  const setItems = useSetAtom(itemsAtom)
  const setCommands = useSetAtom(commandsAtom)
  const { data, refetch } = useLoadCommands()

  useEffect(() => {
    if (data?.length) {
      setItems(data)
      setCommands(data)
    }
  }, [data, setItems, setCommands])
}

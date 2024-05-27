import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom, useSetAtom } from 'jotai'
import { db } from '@penx/local-db'
import { Node } from '@penx/model'
import { ICommandItem } from '~/common/types'
import { useSearch } from './useSearch'

const isDeveloping = (item: ICommandItem) => item.data?.isDeveloping
const isProduction = (item: ICommandItem) => !item.data?.isDeveloping

export const itemsAtom = atom<ICommandItem[]>([])

export function useItems() {
  const { search } = useSearch()
  const [items, setItems] = useAtom(itemsAtom)
  return {
    items,
    developingItems: items.filter(isDeveloping).filter((item) => {
      if (!search) return true
      if (item.data?.alias) {
        if (item.data?.alias.toLowerCase().includes(search.toLowerCase())) {
          return true
        }
      }
      return item.title.toString().toLowerCase().includes(search.toLowerCase())
    }),

    productionItems: items.filter(isProduction).filter((item) => {
      if (!search) return true
      if (item.data?.alias) {
        if (item.data?.alias.toLowerCase().includes(search.toLowerCase())) {
          return true
        }
      }
      return item.title.toString().toLowerCase().includes(search.toLowerCase())
    }),
    setItems,
  }
}

export const commandsAtom = atom<ICommandItem[]>([])

export function useCommands() {
  const [commands, setCommands] = useAtom(itemsAtom)
  return { commands, setCommands }
}

export function useLoadCommands() {
  return useQuery(['commands'], async () => {
    const [extensions, databases] = await Promise.all([
      db.listExtensions(),
      db.listDatabases(),
    ])

    const commands = extensions.reduce((acc, cur) => {
      return [
        ...acc,
        ...cur.commands.map<ICommandItem>((item) => {
          function getIcon() {
            const defaultIcon = cur.icon ? cur.assets?.[cur.icon] : ''
            if (!item.icon) return defaultIcon

            if (item.icon?.startsWith('/')) return item.icon

            const commandIcon = cur.assets?.[item.icon]
            return commandIcon || defaultIcon
          }

          return {
            type: 'command',
            title: item.title,
            subtitle: cur.name,
            icon: getIcon(),
            keywords: [],
            data: {
              type: 'Command',
              alias: item.alias,
              assets: cur.assets,
              filters: item.filters,
              runtime: item.runtime,
              commandName: item.name,
              extensionSlug: cur.slug,
              extensionIcon: cur.assets?.[cur.icon as string],
              isDeveloping: cur.isDeveloping,
            } as ICommandItem['data'],
          } as ICommandItem
        }),
      ]
    }, [] as ICommandItem[])

    const databaseItems = databases.reduce((acc, item) => {
      const node = new Node(item)
      if (node.isSpecialDatabase) return acc
      return [
        ...acc,
        {
          type: 'command',
          title: node.tagName,
          subtitle: '',
          icon: {
            value: '#',
            bg: node.tagColor,
          },
          keywords: [],
          data: {
            alias: item.props.commandAlias,
            type: 'Database',
            database: item,
          } as ICommandItem['data'],
        } as ICommandItem,
      ]
    }, [] as ICommandItem[])

    return [...commands, ...databaseItems]
  })
}

export function useQueryCommands() {
  const setItems = useSetAtom(itemsAtom)
  const setCommands = useSetAtom(commandsAtom)
  const { data } = useLoadCommands()

  useEffect(() => {
    if (data?.length) {
      setItems(data)
      setCommands(data)
    }
  }, [data, setItems, setCommands])
}

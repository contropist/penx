import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom, useSetAtom } from 'jotai'
import { IListItem } from 'penx'
import { db } from '@penx/local-db'
import { Node } from '@penx/model'
import { useSearch } from './useSearch'

export const itemsAtom = atom<IListItem[]>([])

export function useItems() {
  const { search } = useSearch()
  const [items, setItems] = useAtom(itemsAtom)
  return {
    items,
    developingItems: items.filter((item) => {
      if (!search) return item.data?.isDeveloping
      return (
        item.data?.isDeveloping &&
        item.title.toString().toLowerCase().includes(search.toLowerCase())
      )
    }),
    productionItems: items.filter((item) => {
      if (!search) return !item.data?.isDeveloping
      return (
        !item.data?.isDeveloping &&
        item.title.toString().toLowerCase().includes(search.toLowerCase())
      )
    }),
    setItems,
  }
}

export const commandsAtom = atom<IListItem[]>([])

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
        ...cur.commands.map<IListItem>((item) => {
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
            data: {
              type: 'Command',
              assets: cur.assets,
              filters: item.filters,
              runtime: item.runtime,
              commandName: item.name,
              extensionSlug: cur.slug,
              extensionIcon: cur.assets?.[cur.icon as string],
              isDeveloping: cur.isDeveloping,
            },
          }
        }),
      ]
    }, [] as IListItem[])

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
          data: {
            type: 'Database',
            database: item,
          },
        } as IListItem,
      ]
    }, [] as IListItem[])

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

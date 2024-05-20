import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom, useSetAtom } from 'jotai'
import { ListItem } from 'penx'
import { db } from '@penx/local-db'

export const itemsAtom = atom<ListItem[]>([])

export function useItems() {
  const [items, setItems] = useAtom(itemsAtom)
  return {
    items,
    developingItems: items.filter((item) => item.data?.isDeveloping),
    productionItems: items.filter((item) => !item.data?.isDeveloping),
    setItems,
  }
}

export const commandsAtom = atom<ListItem[]>([])

export function useCommands() {
  const [commands, setCommands] = useAtom(itemsAtom)
  return { commands, setCommands }
}

export function useQueryCommands() {
  const setItems = useSetAtom(itemsAtom)
  const setCommands = useSetAtom(commandsAtom)

  const { data } = useQuery(['commands'], async () => {
    const extensions = await db.listExtensions()

    return extensions.reduce((acc, cur) => {
      return [
        ...acc,
        ...cur.commands.map<ListItem>((item) => {
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
              runtime: item.runtime,
              commandName: item.name,
              extensionSlug: cur.slug,
              extensionIcon: cur.assets?.[cur.icon as string],
              isDeveloping: cur.isDeveloping,
            },
          }
        }),
      ]
    }, [] as ListItem[])
  })

  useEffect(() => {
    if (data?.length) {
      setItems(data)
      setCommands(data)
    }
  }, [data, setItems, setCommands])
}

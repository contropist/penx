import { ActionPanel, ListApp, ListItem, Action, useQuery } from '@penxio/react'
import { getTodos } from './libs/getTodos'

export function Main() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(20),
  })

  return (
    <ListApp isLoading={isLoading} isDetailVisible>
      {data.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          icon={{
            // name: 'tabler--brand-mysql',
            name: index + 1,
            className:
              'text-white bg-gradient-to-tl from-blue-500 to-green-500',
          }}
          accessories={[
            {
              text: {
                value: item.completed ? 'Done' : 'Doing',
                color: item.completed ? 'text-green-500' : 'text-orange-500',
              },
            },
          ]}
          detail={
            <div>
              <div>id: {item.id}</div>
              <div>title: {item.title}</div>
            </div>
          }
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                content="Hello"
                shortcut={{
                  modifiers: ['cmd'],
                  key: 'enter',
                }}
              />
              <Action.OpenInBrowser
                url="https://iconify.design/docs/usage/css/tailwind/iconify/"
                shortcut={{
                  modifiers: ['cmd', 'shift'],
                  key: 'enter',
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </ListApp>
  )
}

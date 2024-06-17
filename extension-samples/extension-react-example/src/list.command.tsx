import { ActionPanel, ListApp, ListItem, Action, useQuery } from '@penx/react'
import { getData } from './libs/getData'
import './command.css'

export function Main() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => getData('top'),
  })

  return (
    <ListApp isLoading={isLoading}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          subtitle={100 + index}
          // icon={index}
          icon={{
            // name: 'tabler--brand-mysql',
            name: index + 1,
            className:
              'text-white bg-gradient-to-tl from-orange-500 to-yellow-500',
          }}
          accessories={[
            { icon: { name: 'mdi--home' }, text: item.descendants || 0 },
            { icon: { name: 'mdi--user' }, text: item.score || 0 },
          ]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                content="Hello"
                // icon={{
                //   name: 'mdi--home',
                // }}
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

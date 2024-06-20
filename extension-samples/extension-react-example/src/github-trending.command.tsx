import { ActionPanel, ListApp, ListItem, Action, useQuery } from '@penxio/react'
import './command.css'
import { getTrendingData } from './libs/getTrendingData'

export function Main() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => getTrendingData('top'),
  })

  return (
    <ListApp isLoading={isLoading}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          title={`${item.author}/${item.name}`}
          subtitle={item.description}
          titleLayout="vertical"
          icon={{
            // name: 'tabler--brand-mysql',
            name: index + 1,
            className:
              'text-white bg-gradient-to-tl from-orange-500 to-yellow-500',
          }}
          accessories={[
            { icon: { name: 'mdi--star' }, text: item.stars },
            {
              text: {
                value: `+${item.currentPeriodStars}`,
                color: 'text-green-500',
              },
            },
          ]}
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

import { ActionPanel, ListApp, ListItem, Action } from '@penx/react'

export function Main() {
  const list = [
    'Foo',
    'Foo',
    'Foo',
    'Bar',
    'Hello world',
    'Name1',
    'Bar',
    'Hello world',
    'Name1',
    'Bar',
    'Hello world',
    'Name1',
    'Foo',
    'Bar',
    'Hello world',
    'Name1',
    'Foo',
    'Bar',
    'Hello world',
    'Name1',

    'Foo',
    'Bar',
    'Hello world',
    'Name1',
  ]

  return (
    <ListApp>
      {list.map((item, index) => (
        <ListItem
          key={index}
          title={item + index}
          subtitle={100 + index}
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

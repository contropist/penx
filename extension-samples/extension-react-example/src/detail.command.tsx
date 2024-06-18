import { ActionPanel, ListApp, ListItem, Action } from '@penx/react'
import { clipboard, dialog } from 'penx'
import { useEffect } from 'react'

export function Main() {
  useEffect(() => {
    ;(async () => {
      // await clipboard.writeText('Hello from huakun')
      // const cbText = await clipboard.readText()
      // console.log('Clipboard text:', cbText)
    })()
  }, [])
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
          icon={{
            name: 'tabler--brand-mysql',
            className: 'text-white bg-gradient-to-tl from-cyan-500 to-blue-500',
          }}
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

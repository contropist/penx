import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { listen, UnlistenFn } from '@tauri-apps/api/event'
import { Kbd, usePopoverContext } from 'uikit'
import { db } from '@penx/local-db'
import { IExtension } from '@penx/model-types'
import { convertKeysToHotkey, unregisterHotkey } from '~/common/hotkey.util'
import { useExtensions } from './useExtensions'
import { registerCommandHotkey } from './utils'

interface Props {
  command: IExtension['commands'][0]
  extension: IExtension
}

const modifierKeys = ['Control', 'Meta', 'Shift', 'Alt']
const modifierCodes = [
  'ControlLeft',
  'MetaLeft',
  'ShiftLeft',
  'AltLeft',
  'ControlRight',
  'MetaRight',
  'ShiftRight',
  'AltRight',
]

export function BindingHotkeyContent({ extension, command }: Props) {
  const { refetch } = useExtensions()
  const ctx = usePopoverContext()
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    let unlisten: UnlistenFn

    async function listenBlur() {
      unlisten = await listen('tauri://blur', () => {
        ctx.close()
      })
    }

    listenBlur()

    async function handler(event: KeyboardEvent) {
      let keys = []
      if (event.ctrlKey) keys.push('Control')
      if (event.metaKey) keys.push('Meta')
      if (event.shiftKey) keys.push('Shift')
      if (event.altKey) keys.push('Alt')

      if (event.code === 'Space') {
        keys.push('Space')
      } else {
        if (event.key.length === 1) {
          keys.push(event.key.toUpperCase())
        } else {
          keys.push(event.code)
        }
      }

      const lastKey = keys[keys.length - 1]

      const isModifierKey = modifierKeys.includes(lastKey) || modifierCodes.includes(lastKey)

      keys = keys.filter((key) => !modifierCodes.includes(key))

      if (!isModifierKey) {
        const oldHotkey = command.hotkey ? convertKeysToHotkey(command.hotkey) : undefined
        const newHotkey = convertKeysToHotkey(keys)

        console.log('111111111:', oldHotkey)

        oldHotkey && (await unregisterHotkey(oldHotkey))
        await registerCommandHotkey(extension, command, newHotkey)
        await db.updateCommandHotkey(extension.id, command.name, keys)
        await refetch()
        ctx.close()
      } else {
        setKeys(keys)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
      unlisten?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box column toBetween h-100p toCenterX gap3>
      {!keys.length && (
        <Box toCenterY leadingNone gap2>
          <Box textSM neutral500>
            e.g.
          </Box>

          <Box toCenterY gap1>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>9</Kbd>
          </Box>
        </Box>
      )}
      {keys.length > 0 && (
        <Box toCenterY gap1>
          {keys.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </Box>
      )}
      <Box neutral500 textXS>
        Recording...
      </Box>
    </Box>
  )
}

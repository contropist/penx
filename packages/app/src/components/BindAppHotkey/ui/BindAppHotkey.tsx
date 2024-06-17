import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { listen, UnlistenFn } from '@tauri-apps/api/event'
import {
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
  usePopoverContext,
} from 'uikit'
import { useAppHotkey } from '../hooks/useAppHotkey'
import {
  convertKeysToHotkey,
  getAppHotkey,
  registerAppHotkey,
  saveAppHotkey,
  unregisterHotkey,
} from '../utils'

interface Props {}

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

function Content() {
  const ctx = usePopoverContext()
  const { refetch } = useAppHotkey()
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
      console.log('event========:', event)
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

      const isModifierKey =
        modifierKeys.includes(lastKey) || modifierCodes.includes(lastKey)

      keys = keys.filter((key) => !modifierCodes.includes(key))

      if (!isModifierKey) {
        console.log('-==========keys:', keys, 'lastKey:', lastKey)

        const oldKeys = await getAppHotkey()
        console.log('----44444444444')

        const oldHotkey = convertKeysToHotkey(oldKeys)
        const newHotkey = convertKeysToHotkey(keys)

        await unregisterHotkey(oldHotkey)
        await unregisterHotkey(newHotkey)
        await registerAppHotkey(newHotkey)
        await saveAppHotkey(keys)
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
    <Box column toBetween h-100p toCenterX>
      {!keys.length && (
        <Box toCenterY leadingNone gap2>
          <Box textSM neutral500>
            e.g.
          </Box>

          <Box toCenterY gap1>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>Space</Kbd>
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

export const BindAppHotkey = ({}: Props) => {
  const { data = [], isLoading } = useAppHotkey()
  console.log('x=======data:', data)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Box bgNeutral100 h-40 w-200 rounded2XL toCenter cursorPointer>
          <Box toCenterY gap1>
            {data.map((item) => (
              <Kbd key={item}>{item}</Kbd>
            ))}
          </Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent w-200 h-100 p4 column toCenterX>
        <Content />
      </PopoverContent>
    </Popover>
  )
}

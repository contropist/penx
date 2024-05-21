import { Dispatch, SetStateAction, useEffect } from 'react'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'
import { commandUIAtom, useCommandAppUI } from './useCommandAppUI'
import { positionAtom } from './useCommandPosition'
import { currentCommandAtom } from './useCurrentCommand'
import { useCommands, useItems } from './useItems'

export function useReset(setQ: Dispatch<SetStateAction<string>>) {
  const { items, setItems } = useItems()
  const { commands } = useCommands()

  useEffect(() => {
    function reset() {
      if (commands.length) {
        setItems(commands)
      }

      const position = store.get(positionAtom)
      if (position === 'COMMAND_APP') {
        store.set(positionAtom, 'ROOT')
        store.set(currentCommandAtom, null as any)
        store.set(commandUIAtom, {} as any)
      }

      setQ('')
    }

    appEmitter.on('ON_ESCAPE_IN_COMMAND', reset)
    return () => {
      appEmitter.off('ON_ESCAPE_IN_COMMAND', reset)
    }
  }, [])
}

import { Dispatch, SetStateAction, useEffect } from 'react'
import { appEmitter } from '@penx/event'
import { useCommandAppUI } from './useCommandAppUI'
import { useCommands, useItems } from './useItems'

export function useReset(setQ: Dispatch<SetStateAction<string>>) {
  const { items, setItems } = useItems()
  const { commands } = useCommands()

  useEffect(() => {
    function reset() {
      if (commands.length) {
        setItems(commands)
      }
      setQ('')
    }

    appEmitter.on('ON_MAIN_WINDOW_HIDE', reset)
    return () => {
      appEmitter.off('ON_MAIN_WINDOW_HIDE', reset)
    }
  }, [])
}

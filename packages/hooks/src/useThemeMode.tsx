import { useCallback, useEffect } from 'react'
import { fowerStore } from '@fower/react'
import { get, set } from 'idb-keyval'
import { atom, useAtom } from 'jotai'
import { FOWER_THEME_MODE } from '@penx/constants'

const modeAtom = atom('')

export function useThemeMode() {
  const [mode, setModeState] = useAtom<string>(modeAtom)

  const setMode = useCallback(
    (mode: string) => {
      setModeState(mode)
      fowerStore.setMode(mode)
      set(FOWER_THEME_MODE, mode)
    },
    [setModeState],
  )

  const initMode = useCallback(
    async function () {
      const value = await get(FOWER_THEME_MODE)
      if (!value) {
        set(FOWER_THEME_MODE, 'light')
      }

      setMode(value || 'light')
    },
    [setMode],
  )

  useEffect(() => {
    if (!mode) {
      initMode()
    }
  }, [mode, initMode])

  return { mode, setMode, initMode }
}

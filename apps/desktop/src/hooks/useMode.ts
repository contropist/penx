import { atom, useAtom } from 'jotai'

type Mode = 'COMMAND' | 'EDITOR'

export const modeAtom = atom<Mode>('COMMAND')

export function useMode() {
  const [mode, setMode] = useAtom(modeAtom)

  return {
    isEditor: mode === 'EDITOR',
    mode,
    setMode,
  }
}

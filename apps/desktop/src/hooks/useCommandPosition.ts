import { atom, useAtom } from 'jotai'
import { useCurrentCommand } from './useCurrentCommand'

type Position = 'ROOT' | 'COMMAND_APP'

export const positionAtom = atom<Position>('ROOT')

export function useCommandPosition() {
  const { setCurrentCommand } = useCurrentCommand()
  const [position, setPosition] = useAtom(positionAtom)
  function backToRoot() {
    setPosition('ROOT')
    setCurrentCommand(null as any)
  }
  return {
    isRoot: position === 'ROOT',
    isCommandApp: position === 'COMMAND_APP',
    position,
    backToRoot,
    setPosition,
  }
}

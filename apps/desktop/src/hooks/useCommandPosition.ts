import { atom, useAtom } from 'jotai'
import { workerStore } from '~/common/workerStore'
import { useCurrentCommand } from './useCurrentCommand'

type Position = 'ROOT' | 'COMMAND_APP'

export const positionAtom = atom<Position>('ROOT')

export function useCommandPosition() {
  const { setCurrentCommand } = useCurrentCommand()
  const [position, setPosition] = useAtom(positionAtom)
  function backToRoot() {
    setPosition('ROOT')
    setCurrentCommand(null as any)

    console.log('workerStore.currentWorker:', workerStore.currentWorker)

    if (workerStore.currentWorker) {
      console.log('postmesge.........')

      workerStore.currentWorker.postMessage('BACK_TO_ROOT')
    }
  }
  return {
    isRoot: position === 'ROOT',
    isCommandApp: position === 'COMMAND_APP',
    position,
    backToRoot,
    setPosition,
  }
}

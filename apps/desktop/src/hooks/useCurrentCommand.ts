import { atom, useAtom } from 'jotai'
import { Command } from '@penx/model'

export const currentCommandAtom = atom<Command>(null as any as Command)

export function useCurrentCommand() {
  const [currentCommand, setCurrentCommand] = useAtom(currentCommandAtom)
  return { currentCommand, setCurrentCommand }
}

import { atom, useAtom } from 'jotai'
import { ICommandItem } from '~/common/types'

export const currentCommandAtom = atom<ICommandItem>(null as any as ICommandItem)

export function useCurrentCommand() {
  const [currentCommand, setCurrentCommand] = useAtom(currentCommandAtom)
  return { currentCommand, setCurrentCommand }
}

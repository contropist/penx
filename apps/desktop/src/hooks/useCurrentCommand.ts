import { atom, useAtom } from 'jotai'
import { IListItem } from 'penx'

export const currentCommandAtom = atom<IListItem>(null as any as IListItem)

export function useCurrentCommand() {
  const [currentCommand, setCurrentCommand] = useAtom(currentCommandAtom)
  return { currentCommand, setCurrentCommand }
}

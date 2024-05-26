import { atom, useAtom } from 'jotai'
import { IDatabaseNode } from '@penx/model-types'

export const currentDatabaseAtom = atom<IDatabaseNode>(
  null as any as IDatabaseNode,
)

export function useCurrentDatabase() {
  const [database, setDatabase] = useAtom(currentDatabaseAtom)
  return { database, setDatabase }
}

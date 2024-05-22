import { atom, useAtom } from 'jotai'

const searchAtom = atom('')
export function useSearch() {
  const [search, setSearch] = useAtom(searchAtom)

  return { search, setSearch }
}

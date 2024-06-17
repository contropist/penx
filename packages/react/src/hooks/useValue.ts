import { atom, useAtom } from 'jotai'

export const valueAtom = atom('')

export function useValue() {
  const [value, setValue] = useAtom(valueAtom)
  return { value, setValue }
}

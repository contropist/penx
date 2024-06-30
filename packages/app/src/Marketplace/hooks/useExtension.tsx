import { atom, useAtom } from 'jotai'

type Extension = any

export const extensionAtom = atom<Extension>({} as Extension)

export function useExtension() {
  const [extension, setExtension] = useAtom(extensionAtom)
  return { extension, setExtension }
}

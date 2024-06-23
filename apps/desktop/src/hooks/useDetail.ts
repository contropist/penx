import { atom, useAtom } from 'jotai'

interface Detail {
  isLoading: boolean
  data: any
}

export const detailAtom = atom<Detail>({ isLoading: false, data: [] })

export function useDetail() {
  const [detail, setDetail] = useAtom(detailAtom)

  return { detail, setDetail }
}

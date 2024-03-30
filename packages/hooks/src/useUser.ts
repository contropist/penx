import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { User } from '@penx/model'
import { setAuthorizedUser } from '@penx/storage'
import { store, userAtom, userLoadingAtom } from '@penx/store'
import { api } from '@penx/trpc-client'

export function useQueryUser(userId: string) {
  useEffect(() => {
    store.user.setLoading(true)

    api.user.byId.query({ id: userId }).then((data) => {
      store.user.setLoading(false)
      store.user.setUser(new User(data))
      setAuthorizedUser(data)
    })
  }, [userId])
}

export function useUser() {
  const user = useAtomValue(userAtom)
  return user
}

export function useUserLoading() {
  return useAtomValue(userLoadingAtom)
}

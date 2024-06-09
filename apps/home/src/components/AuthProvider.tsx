import React, { PropsWithChildren, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { SessionProvider } from '@penx/session'
import { setLocalSession } from '@penx/storage'

export function AuthProvider({ children }: PropsWithChildren) {
  const { ready, user } = usePrivy()

  useEffect(() => {
    setLocalSession(user as any)
  }, [user])

  if (!ready) return null

  return (
    <SessionProvider
      value={{
        data: user as any,
        loading: false,
      }}
    >
      {children}
    </SessionProvider>
  )
}

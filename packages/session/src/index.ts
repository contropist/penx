import { createContext, useContext } from 'react'
import { User } from '@privy-io/react-auth'

export interface SessionContextValue {
  data: User
  loading: boolean
}

export const sessionContext = createContext<SessionContextValue>({
  data: null,
  loading: true,
} as any)

export const SessionProvider = sessionContext.Provider

export function useSession() {
  return useContext(sessionContext)
}

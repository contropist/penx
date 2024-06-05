import { FC, PropsWithChildren } from 'react'
import { ToastContainer } from 'uikit'
import { useSession } from '@penx/session'
import { StoreProvider } from '@penx/store'
import { TrpcProvider } from '@penx/trpc-client'
import { EventHandler } from '~/components/EventHandler'
import { InitUserToStore } from '~/components/InitUserToStore'

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <StoreProvider>
      <TrpcProvider>
        <EventHandler />

        {session && <InitUserToStore userId={session.id} />}
        {children}
        <ToastContainer position="bottom-right" />
      </TrpcProvider>
    </StoreProvider>
  )
}

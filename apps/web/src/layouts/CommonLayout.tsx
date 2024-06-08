import { FC, PropsWithChildren } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseGoerli,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
} from 'viem/chains'
import { http } from 'wagmi'
import { useSession } from '@penx/session'
import { StoreProvider } from '@penx/store'
import { TrpcProvider } from '@penx/trpc-client'
import { wagmiConfig } from '@penx/wagmi'
import { ClientOnly } from '@penx/widget'
import { AuthProvider } from '~/components/AuthProvider'
import { EventHandler } from '~/components/EventHandler'
import { InitUserToStore } from '~/components/InitUserToStore'

const queryClient = new QueryClient()

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ClientOnly>
        <EventHandler />

        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
          config={{
            // Customize Privy's appearance in your app
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              logo: '/images/logo.png',
            },
            defaultChain: arbitrumSepolia,
            supportedChains: [
              arbitrumSepolia,
              mainnet,
              sepolia,
              base,
              baseGoerli,
              polygon,
              polygonMumbai,
            ],

            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
              <AuthProvider>
                <TrpcProvider>{children}</TrpcProvider>
              </AuthProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </ClientOnly>
    </StoreProvider>
  )
}

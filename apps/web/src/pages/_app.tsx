import { Fragment } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { createConfig, WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
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
import { ToastContainer } from 'uikit'
import { isServer } from '@penx/constants'
import { ClientOnly } from '@penx/widget'
import { AuthProvider } from '~/components/AuthProvider'
import { initFower } from '../common/initFower'
// import { SpeedInsights } from '@vercel/speed-insights/next'
// import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism-twilight.css'

import 'simplebar-react/dist/simplebar.min.css'
import 'react-circular-progressbar/dist/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/globals.css'
import '../styles/command.scss'
import { wagmiConfig } from '@penx/wagmi'

initFower()

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component'] & {
    Layout: any
  }
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: Props<any>) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <NextSeo
        title="PenX: A cross-platform productivity App"
        description="PenX is a cross-platform productivity App built on open-source and Web3."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://www.penx.io',
          siteName: 'PenX',
        }}
        twitter={{
          handle: '@coder_zion',
          site: '@coder_zion',
          cardType: 'summary_large_image',
        }}
      />

      <ClientOnly>
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
                <Layout>
                  <Component {...pageProps} />
                  <div id="portal" />
                  <ToastContainer position="bottom-right" />
                </Layout>
              </AuthProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </ClientOnly>
    </>
  )
}

export default MyApp

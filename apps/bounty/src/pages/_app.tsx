import { Fragment, useEffect } from 'react'
import { fowerStore, Parser } from '@fower/react'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'uikit'
import { isServer } from '@penx/constants'
import { ClientOnly } from '@penx/widget'
import { api } from '~/utils/api'
import { initFower } from '../common/initFower'
// import { SpeedInsights } from '@vercel/speed-insights/next'
// import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism-twilight.css'

import '../styles/globals.css'
import { TrpcProvider } from '@penx/trpc-client'
import { WalletConnectProvider } from '~/components/WalletConnectProvider'

initFower()

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component'] & {
    Layout: any
  }
}

if (!isServer) {
  // TODO: move this code to a separate file
}

function MyApp({ Component, pageProps }: Props<any>) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <ClientOnly>
        <TrpcProvider>
          {/* <SpeedInsights /> */}
          <Layout>
            <Component {...pageProps} />
            <div id="portal" />
          </Layout>
          <ToastContainer position="bottom-right" />

          {/* <Analytics /> */}
        </TrpcProvider>
      </ClientOnly>
    </>
  )
}

export default MyApp

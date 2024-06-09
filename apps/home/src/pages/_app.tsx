import { Fragment } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'uikit'
import { initFower } from '../common/initFower'
import 'simplebar-react/dist/simplebar.min.css'
import 'react-circular-progressbar/dist/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/globals.css'
import '../styles/command.scss'

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

      <Layout>
        <Component {...pageProps} />
        <div id="portal" />
        <ToastContainer position="bottom-right" />
      </Layout>
    </>
  )
}

export default MyApp

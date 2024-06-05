import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import { initFower } from '../common/initFower'
import '../styles/globals.css'

initFower()

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component'] & {
    Layout: any
  }
}

function MyApp({ Component, pageProps }: Props<any>) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <Layout>
        <Component {...pageProps} />
        <div id="portal" />
      </Layout>
    </>
  )
}

export default MyApp

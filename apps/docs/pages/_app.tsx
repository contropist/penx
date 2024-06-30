import { AppProps } from 'next/app'
import '../custom.css'

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component']
}

function MyApp({ Component, pageProps }: Props<any>) {
  return <Component {...pageProps} />
}

export default MyApp

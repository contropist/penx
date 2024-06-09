import { Box, getAtomIds, getCssString } from '@fower/react'
import { getCookie, setCookie } from 'cookies-next'
import { NextSeo } from 'next-seo'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { DEFAULT_THEME, FOWER_THEME_MODE } from '@penx/constants'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const cookieTheme = getCookie(FOWER_THEME_MODE, ctx) as string

    if (!cookieTheme) {
      setCookie(FOWER_THEME_MODE, DEFAULT_THEME, { req: ctx.req, res: ctx.res })
    }

    let theme: string = getCookie(FOWER_THEME_MODE, ctx) as string

    ;(initialProps as any).theme = theme || DEFAULT_THEME

    return initialProps
  }

  render() {
    const theme = (this.props as any).theme

    return (
      <Html lang="en" className={theme || 'light'}>
        <Head>
          <style
            data-fower={getAtomIds()}
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
          <link rel="icon" href="/favicon.ico" />

          {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <script
              defer
              src="https://umami.penx.io/script.js"
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!}
            ></script>
          )}

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=optional"
          />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

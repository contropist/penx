import React, { lazy, Suspense, useEffect } from 'react'
import { Box } from '@fower/react'
import { set } from 'idb-keyval'
import { useSession } from 'next-auth/react'
import { PENX_SESSION_USER_ID } from '@penx/constants'
import { SessionProvider } from '@penx/session'
import { EarlyAccessCodeProvider } from '~/components/EarlyAccessCode/EarlyAccessCodeProvider'
import { MasterPasswordProvider } from '~/components/MasterPasswordLogin/MasterPasswordProvider'

const LazyEditorApp = lazy(() => import('@penx/app'))

const PageEditor = () => {
  const session = useSession()

  useEffect(() => {
    if (session?.data?.userId) {
      set(PENX_SESSION_USER_ID, session?.data?.userId)
    }
  }, [session])

  if (session?.status === 'loading') return null

  // console.log('=========session:', session)

  return (
    <SessionProvider
      value={{
        data: session.data as any,
        // loading: session.status === 'loading',
        loading: false,
      }}
    >
      <EarlyAccessCodeProvider>
        <MasterPasswordProvider>
          <Suspense
            fallback={
              <Box h-100vh toCenterY black bgWhite>
                Loading...
              </Box>
            }
          >
            <LazyEditorApp></LazyEditorApp>
          </Suspense>
        </MasterPasswordProvider>
      </EarlyAccessCodeProvider>
    </SessionProvider>
  )
}

export default PageEditor

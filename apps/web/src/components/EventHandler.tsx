import { useEffect } from 'react'
import { set } from 'idb-keyval'
import { appEmitter } from '@penx/event'
import { clearAuthorizedUser } from '@penx/storage'

export function EventHandler() {
  useEffect(() => {
    const handleSignOut = async () => {
      clearAuthorizedUser()
    }
    appEmitter.on('SIGN_OUT', handleSignOut)

    const handleSignIn = () => {
      //
    }
    appEmitter.on('SIGN_IN_GOOGLE', handleSignIn)

    return () => {
      appEmitter.off('SIGN_OUT', handleSignOut)
      appEmitter.off('SIGN_IN_GOOGLE', handleSignIn)
    }
  }, [])

  return null
}

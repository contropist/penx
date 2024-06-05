import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { Spinner, toast } from 'uikit'
import {
  getNewMnemonic,
  getPublicKey,
  setMnemonicToLocal,
} from '@penx/mnemonic'
import { useSession } from '@penx/session'
import { store } from '@penx/store'
import { api } from '@penx/trpc-client'

export function MnemonicGenerator({ children }: PropsWithChildren) {
  return null
  // const { data } = useSession()
  // const doingRef = useRef(false)

  // const initMnemonic = useCallback(async () => {
  //   try {
  //     const mnemonic = await getNewMnemonic()
  //     await setMnemonicToLocal(data?.id!, mnemonic)
  //     const publicKey = getPublicKey(mnemonic)
  //     await api.user.updatePublicKey.mutate({ publicKey })
  //     store.user.setMnemonic(mnemonic)
  //   } catch (error) {
  //     // TODO: handle error
  //     console.log('=====error:', error)
  //     toast.error('Init account failed, please try to refresh.')
  //   }
  // }, [data?.userId, update])

  // useEffect(() => {
  //   if (data?.publicKey || doingRef.current) return

  //   doingRef.current = true
  //   initMnemonic()
  // }, [data, initMnemonic])

  // if (!data?.publicKey) {
  //   return (
  //     <Box h-100vh toCenter>
  //       <Box toCenterY gap2>
  //         <Spinner square5 />
  //         <Box>Account initializing...</Box>
  //       </Box>
  //     </Box>
  //   )
  // }

  // return <>{children}</>
}

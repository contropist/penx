import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi'
import { Button, Modal, ModalContent, modalController, ModalOverlay, Spinner, toast } from 'uikit'
import { ModalNames } from '@penx/constants'
import { useHandleSignIn } from './hooks/useHandleSignIn'

export function SiweModal() {
  const { isConnected, address = '' } = useAccount()
  const { disconnect } = useDisconnect()
  const [loading, setLoading] = useState(false)

  const handleSignIn = useHandleSignIn()

  useEffect(() => {
    const token = localStorage.getItem('PENX_TOKEN')
    if (isConnected && !token) {
      modalController.open(ModalNames.SIWE)
    }
  }, [isConnected])

  const shortenAddress = `${address?.slice(0, 18)}...${address?.slice(-4)}`

  return (
    <Modal name={ModalNames.SIWE} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent w={['96%', 360]} px={[20, 20]} py0 column gap4>
        <Box column toCenterX>
          <Box fontSemibold text2XL leadingNone>
            Sign in to PenX
          </Box>
        </Box>

        <Box toCenter>
          <Box gray800 py1 px3 bgNeutral100 roundedFull inlineFlex>
            {shortenAddress}
          </Box>
        </Box>

        <Box textCenter neutral500 leadingTight textSM>
          Sign this message to prove you own this wallet and proceed. Canceling will disconnect you.
        </Box>

        <Box textCenter green500 leadingTight textXS>
          Please verify by signing in with mobile wallet.
        </Box>

        <Box toCenterY gap2 mt2>
          <Button
            type="button"
            roundedFull
            colorScheme="white"
            flex-1
            onClick={() => {
              modalController.close(ModalNames.SIWE)
              disconnect()
            }}
          >
            Cancel
          </Button>

          <Button
            roundedFull
            gap2
            flex-1
            disabled={loading}
            onClick={async () => {
              if (loading) return
              try {
                setLoading(true)
                await handleSignIn()
                modalController.close(ModalNames.SIWE)
                setLoading(false)
              } catch (error) {
                setLoading(false)
                toast.error((error as any)?.message || 'Something went wrong')
                console.log('====error:', error)
              }
            }}
          >
            {loading && <Spinner white square5 />}
            <Box>Sign in</Box>
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}

import React from 'react'
import { Box } from '@fower/react'
import ky from 'ky'
import { useRouter } from 'next/router'
import { Button, Spinner, toast } from 'uikit'
import { useHideLogoLoader } from '@penx/hooks'
import { getMnemonicFromLocal } from '@penx/mnemonic'
import { api, trpc } from '@penx/trpc-client'
import { CommonLayout } from '~/layouts/CommonLayout'

export default function CliLogin() {
  const { isLoading, mutateAsync } = trpc.user.loginDesktop.useMutation()

  return (
    <Box p10 h-100vh toCenter column bgWhite black gap4>
      <Box text3XL fontBold>
        Login to PenX App
      </Box>
      <Box gray500>Please confirm your authorization for this login.</Box>

      <Box toCenterY gap2 mt6>
        <Button
          size="lg"
          variant="outline"
          colorScheme="white"
          w-200
          gap2
          onClick={async () => {
            window.close()
          }}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          w-200
          disabled={isLoading}
          onClick={async () => {
            try {
              const user = await mutateAsync()
              const mnemonic = await getMnemonicFromLocal(user.id)

              await fetch('http://127.0.0.1:14158/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: JSON.stringify(user),
                  mnemonic,
                }),
              }).then((res) => res.json())

              // await ky.post('http://127.0.0.1:14158/api/login', {
              //   json: {
              //     user: JSON.stringify(user),
              //     mnemonic,
              //   },
              // })
            } catch (error) {
              console.log('error=======', error)
              toast.error('please try again~')
            }
          }}
        >
          {isLoading && <Spinner square5></Spinner>}
          <Box>Authorize Desktop login</Box>
        </Button>
      </Box>
    </Box>
  )
}

CliLogin.Layout = CommonLayout

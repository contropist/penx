import React from 'react'
import { Box } from '@fower/react'
import { ClientOnly } from '@penx/widget'
import { BelieverNFT } from '~/components/BelieverNFT/BelieverNFT'
import { WalletConnectProvider } from '~/components/WalletConnectProvider'

const PageHome = () => {
  return (
    <ClientOnly>
      <WalletConnectProvider>
        <BelieverNFT />
      </WalletConnectProvider>
    </ClientOnly>
  )
}

export default PageHome

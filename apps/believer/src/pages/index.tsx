import React from 'react'
import { Box } from '@fower/react'
import { ClientOnly } from '@penx/widget'
import { BelieverNFT } from '~/components/BelieverNFT/BelieverNFT'

const PageHome = () => {
  return (
    <ClientOnly>
      <BelieverNFT />
    </ClientOnly>
  )
}

export default PageHome

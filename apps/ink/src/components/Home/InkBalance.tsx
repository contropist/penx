import React from 'react'
import { Box } from '@fower/react'
import { useAccount, useReadContract } from 'wagmi'
import { Button } from 'uikit'
import { precision } from '@penx/math'
import { WalletConnectProvider } from '../WalletConnectProvider'
import { WalletProfile } from './WalletProfile'

export function InkBalance() {
  const { isConnected } = useAccount()
  return <WalletProfile></WalletProfile>
}

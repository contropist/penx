import { Suspense, useEffect, useMemo } from 'react'
import { Box } from '@fower/react'
import {
  ConnectedWallet,
  useLogin,
  usePrivy,
  useWallets,
} from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { arbitrumSepolia, base } from 'viem/chains'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ToastContainer,
} from 'uikit'
import { believerNftAbi } from '@penx/abi'
import { addressMap } from '@penx/wagmi'

export function UserProfile() {
  const { ready, authenticated, login, user, getAccessToken, logout } =
    usePrivy()

  if (!user) return null

  return (
    <Box p-60 column toLeft toBetween h-100vh>
      <Box column toCenterX>
        <Avatar size={120}>
          <AvatarImage />
          <AvatarFallback>{user.wallet?.address}</AvatarFallback>
        </Avatar>
        <Box>{user.google?.name}</Box>
      </Box>
      <Box>
        <Button
          colorScheme="gray600"
          variant="light"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

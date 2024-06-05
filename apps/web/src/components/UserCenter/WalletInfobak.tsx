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
import { Button, ToastContainer } from 'uikit'
import { believerNftAbi } from '@penx/abi'
import { useHideLogoLoader } from '@penx/hooks'
import { TrpcProvider } from '@penx/trpc-client'
import { addressMap } from '@penx/wagmi'
import { ClientOnly } from '@penx/widget'
import { Logo } from '~/components/Logo'

export function WalletInfo() {
  const { ready, authenticated, login, user, getAccessToken, logout } =
    usePrivy()

  const { data: nft, ...rest } = useReadContract({
    address: addressMap.BelieverNFT,
    abi: believerNftAbi,
    functionName: 'getTokenInfo',
  })
  // console.log('nft==========:', nft)

  const { wallets } = useWallets()
  const wallet = wallets[0] // Replace this with your desired wallet
  const chainId = wallet?.chainId

  const { address } = useAccount()

  const { writeContractAsync, isLoading } = useWriteContract()

  async function run(wallet: ConnectedWallet) {
    const provider = await wallet.getEthereumProvider()

    const walletClient = createWalletClient({
      chain: arbitrumSepolia,
      transport: custom(provider),
    })

    const publicClient = createPublicClient({
      chain: arbitrumSepolia,
      transport: http(),
    })

    // const data = await publicClient.getBalance({
    //   address: wallet.address as string,
    // })

    // console.log('=======data:', data)

    await writeContractAsync({
      address: addressMap.BelieverNFT,
      abi: believerNftAbi,
      functionName: 'mintNFT',
      args: [''],
      value: nft!.currentPrice,
    })

    // await walletClient.writeContract({
    //   account: address,
    //   address: addressMap.BelieverNFT,
    //   abi: believerNftAbi,
    //   functionName: 'mintNFT',
    //   args: [''],
    //   value: nft!.currentPrice,
    // })

    console.log(
      '=========walletClient.account:',
      await walletClient.getChainId(),
      wallet.address,
    )
  }
  useEffect(() => {
    // if (!wallet) return
  }, [wallet])
  // Replace this code with however you'd like to handle an authenticated user
  if (!user || !wallet || !address) return null
  return (
    <Box p20>
      <Button
        onClick={() => {
          run(wallet)
        }}
      >
        Mint
      </Button>
      <Box>{chainId}</Box>
      <Button
        onClick={async () => {
          await wallet.switchChain(arbitrumSepolia.id)
        }}
      >
        Switch network
      </Button>
    </Box>
  )
}

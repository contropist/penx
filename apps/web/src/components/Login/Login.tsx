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
import { TermsOfService } from './TermsOfService'

export function Login() {
  const { push } = useRouter()
  const { ready, authenticated, user, getAccessToken } = usePrivy()

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount,
    ) => {
      console.log(
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount,
      )
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error)
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  })
  const disableLogin = !ready || (ready && authenticated)

  // console.log('======authenticated:', authenticated, 'user:', user)

  useHideLogoLoader()

  if (ready && authenticated) {
    return <App></App>
  }

  return (
    <TrpcProvider>
      <Box column h-100vh>
        <Box mx-auto py8 toCenter>
          <Logo to="/" />
        </Box>
        <Box column flex-1 toCenter>
          <Box
            toCenter
            py10
            rounded3XL
            mx-auto
            bgWhite
            column
            mt--200
            // border
            w={['100%', '100%', 480]}
          >
            <Box as="h1" fontBold>
              Welcome to PenX
            </Box>
            <Box as="p" textCenter mb6 leadingNormal px10 gray500 textBase>
              Your personal database
            </Box>
            <Box column gap2>
              <Button
                size={56}
                w-320
                textLG
                variant="outline"
                colorScheme="black"
                disabled={disableLogin}
                onClick={login}
              >
                Sign up to PenX
              </Button>

              <Button
                size={56}
                w-320
                textLG
                textBase
                colorScheme="black"
                disabled={disableLogin}
                onClick={login}
              >
                Sign in to existing account
              </Button>
            </Box>

            <TermsOfService />
          </Box>
        </Box>
      </Box>
    </TrpcProvider>
  )
}

function App() {
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
      <Button
        onClick={() => {
          logout()
        }}
      >
        Logout
      </Button>
      <Box>{chainId}</Box>
      <Button
        onClick={async () => {
          await wallet.switchChain(arbitrumSepolia.id)
        }}
      >
        Switch network
      </Button>

      <ExportWalletButton />
    </Box>
  )
}

function ExportWalletButton() {
  const { ready, authenticated, user, exportWallet } = usePrivy()
  // Check that your user is authenticated
  const isAuthenticated = ready && authenticated
  // Check that your user has an embedded wallet
  const hasEmbeddedWallet = !!user?.linkedAccounts.find(
    (account) => account.type === 'wallet' && account.walletClient === 'privy',
  )

  return (
    <Button
      onClick={exportWallet}
      disabled={!isAuthenticated || !hasEmbeddedWallet}
    >
      Export my wallet
    </Button>
  )
}

import { useEffect } from 'react'
import { Box } from '@fower/react'
import { ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { Button } from 'uikit'
import { believerNftAbi } from '@penx/abi'
import { useHideLogoLoader } from '@penx/hooks'
import { TrpcProvider } from '@penx/trpc-client'
import { addressMap } from '@penx/wagmi'
import { Logo } from '~/components/Logo'
import { TermsOfService } from './TermsOfService'

interface Props {
  login: () => void
}

export function Login({ login }: Props) {
  const { ready, authenticated, user, getAccessToken } = usePrivy()

  const disableLogin = !ready || (ready && authenticated)

  useHideLogoLoader()

  if (ready && authenticated) {
    return <App></App>
  }

  return (
    <TrpcProvider>
      <Box toLeft h-100vh black bgWhite bgZinc900--dark>
        <Box column flex-2 toBetween px-60 py-40>
          <Box>
            <Logo to="/" />
          </Box>
          <Box>{`"A cross-platform productivity App built on open-source and Web3."`}</Box>
        </Box>
        <Box flex-3 toCenterY bgWhite--dark black--dark>
          <Box column flex-1 toCenter>
            <Box
              toCenter
              py10
              rounded3XL
              mx-auto
              column
              // border
              w={['100%', '100%', 480]}
            >
              <Box as="h1" fontBold>
                Welcome to PenX
              </Box>
              <Box as="p" textCenter mb6 leadingNormal px10 gray500 textBase>
                A cross-platform productivity App
              </Box>
              <Box column gap4>
                <Button
                  size={56}
                  w-320
                  textLG
                  variant="outline"
                  colorScheme="zinc900"
                  // opacity-60--hover
                  bgZinc900--dark--hover
                  white--dark--hover
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
                  colorScheme="gray900"
                  bgZinc900--dark
                  opacity-90--hover
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

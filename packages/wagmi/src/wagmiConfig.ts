import { createConfig, WagmiProvider } from '@privy-io/wagmi'
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseGoerli,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
} from 'viem/chains'
import { http } from 'wagmi'

export const wagmiConfig = createConfig({
  chains: [arbitrumSepolia, arbitrum, mainnet, sepolia], // Pass your required chains as an array
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

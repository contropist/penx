import ky from 'ky'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'

export function useHandleSignIn() {
  const { address, chainId } = useAccount()
  // const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  return async () => {
    const API_URL = import.meta.env.VITE_API_URL

    const data = await ky
      .get(`${API_URL}/api/siwe/nonce?address=${address}`)
      .json<{ nonce: string }>()

    if (!data?.nonce) {
      console.log('nonce not found', data)
      return
    }

    const nonce = data.nonce

    const message = new SiweMessage({
      version: '1',
      statement: 'Sign in with Ethereum to PenX.',
      domain: 'penx.io',
      uri: 'http://localhost:3000/api/siwe/sign-in',
      address,
      chainId,
      nonce,
    })
    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    })
    console.log('signature:', signature)

    const rest = await ky
      .post(`${API_URL}/api/siwe/sign-in`, {
        json: {
          signature,
          message,
        },
      })
      .json<any>()

    console.log('======rest:', rest)
    localStorage.setItem('PENX_TOKEN', rest.token)
  }
}

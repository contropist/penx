import { getAccessToken } from '@privy-io/react-auth'
import { get } from 'idb-keyval'

export async function getHeaders() {
  // const token = await get('PENX_TOKEN')
  const token = await getAccessToken()
  return {
    Authorization: !token ? '' : token,
  }
}

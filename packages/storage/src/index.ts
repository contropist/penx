import { get, set } from 'idb-keyval'
import { PENX_AUTHORIZED_USER, PENX_SESSION_DATA } from '@penx/constants'

export interface Session {
  userId: string
  earlyAccessCode: string
  publicKey: string
  email: string
  user: {
    name: string
    email: string
    image: string
    id: string
  }
}

type User = {
  id: string
  name: string | null
  bio: string | null
  avatar: string | null
  roleType: string | null
  github: any
  google: any
  username: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  earlyAccessCode: string | null
  publicKey: string | null
  isMnemonicBackedUp: boolean
  createdAt: Date
  updatedAt: Date
  connectedSyncServerId: string | null

  syncServerAccessToken: string
  syncServerUrl: string
}

export async function getAuthorizedUser() {
  try {
    const user = (await get(PENX_AUTHORIZED_USER)) as User
    return user || null
  } catch (error) {
    console.log('error0', error)
    return null as any as User
  }
}

export async function clearAuthorizedUser() {
  await set(PENX_AUTHORIZED_USER, null)
}

export async function setAuthorizedUser(user: any) {
  await set(PENX_AUTHORIZED_USER, user)
}

// export async function getLocalSession(): Promise<Session | undefined> {
export async function getLocalSession(): Promise<any> {
  try {
    return await get(PENX_SESSION_DATA)
  } catch (error) {
    console.log('error1', error)

    return undefined
  }
}

export async function clearLocalSession() {
  await set(PENX_SESSION_DATA, null)
}

export async function setLocalSession(session: Session) {
  await set(PENX_SESSION_DATA, session)
}

const spaceKey = (userId: string) => `ACTIVE_SPACE_${userId}`

export async function getActiveSpaceId(): Promise<string> {
  const session = await getLocalSession()
  if (!session) return ''
  const id = (await get(spaceKey(session.id))) as string

  return id
}

export async function setActiveSpaceId(id: string) {
  const session = await getLocalSession()

  if (!session) return
  await set(spaceKey(session.id), id)
}

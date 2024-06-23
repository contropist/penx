import { appEmitter } from '@penx/event'
import { setMnemonicToLocal } from '@penx/mnemonic'
import { User } from '@penx/model'
import { setAuthorizedUser, setLocalSession } from '@penx/storage'
import { store } from '@penx/store'

// TODO: handle any
export async function loginToDesktop(mnemonic: string, user: any) {
  const token = user.token
  store.setToken(token as string)
  store.user.setUser(new User(user as any))
  store.user.setMnemonic(mnemonic)

  await setMnemonicToLocal(user.id, mnemonic)
  await setLocalSession({
    userId: user.id,
    earlyAccessCode: user.earlyAccessCode as string,
    publicKey: user.publicKey as string,
    email: user.email as string,
    user: {
      name: user.name as string,
      email: user.email as string,
      image: user.image as string,
      id: user.id,
    },
  })

  await setAuthorizedUser(user)

  appEmitter.emit('LOGIN_BY_PERSONAL_TOKEN_SUCCESSFULLY')
  appEmitter.emit('LOAD_CLOUD_SPACES')
}

import { useLogin, usePrivy, useWallets } from '@privy-io/react-auth'
import { Login } from '../components/Login/Login'
import { UserCenter } from '../components/UserCenter/UserCenter'

export default function LoginPage() {
  const { ready, authenticated } = usePrivy()

  if (!ready) return null

  if (authenticated) {
    return <UserCenter />
  }

  return <Login />
}

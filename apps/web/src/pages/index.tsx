import { LoginProvider } from '~/components/Login/LoginProvider'
import { CommonLayout } from '~/layouts/CommonLayout'
import { UserCenter } from '../components/UserCenter/UserCenter'

export default function Page() {
  return (
    <LoginProvider>
      <UserCenter />
    </LoginProvider>
  )
}

Page.Layout = CommonLayout

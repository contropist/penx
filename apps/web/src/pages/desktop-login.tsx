import React from 'react'
import { DesktopLogin } from '~/components/DesktopLogin'
import { LoginProvider } from '~/components/Login/LoginProvider'
import { CommonLayout } from '~/layouts/CommonLayout'

export default function Page() {
  return (
    <LoginProvider>
      <DesktopLogin />
    </LoginProvider>
  )
}

Page.Layout = CommonLayout

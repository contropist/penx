import React from 'react'
import { CliLogin } from '~/components/CliLogin'
import { LoginProvider } from '~/components/Login/LoginProvider'
import { CommonLayout } from '~/layouts/CommonLayout'

export default function Page() {
  return (
    <LoginProvider>
      <CliLogin />
    </LoginProvider>
  )
}

Page.Layout = CommonLayout

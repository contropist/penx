import { Box } from '@fower/react'

export function TermsOfService() {
  return (
    <Box gray400 textSM maxW-300 mt5 textCenter leadingTight>
      By creating an account you agree to our{' '}
      <Box
        as="a"
        href="https://www.penx.io/privacy"
        target="_blank"
        // noUnderline
        black--dark
        underline--hover
      >
        privacy policy
      </Box>{' '}
      and{' '}
      <Box
        as="a"
        href="https://www.penx.io/terms"
        target="_blank"
        black--dark
        // noUnderline
        underline--hover
      >
        terms of service
      </Box>
      .
    </Box>
  )
}

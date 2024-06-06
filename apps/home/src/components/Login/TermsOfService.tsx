import { Box } from '@fower/react'

export function TermsOfService() {
  return (
    <Box gray400 textSM maxW-260 mt5 textCenter leadingTight>
      By creating an account you agree to our{' '}
      <Box
        as="a"
        href="https://www.penx.io/privacy"
        target="_blank"
        brand500
        noUnderline
        underline--hover
      >
        privacy policy
      </Box>{' '}
      and{' '}
      <Box
        as="a"
        href="https://www.penx.io/terms"
        target="_blank"
        brand500
        noUnderline
        underline--hover
      >
        terms of service
      </Box>
      .
    </Box>
  )
}

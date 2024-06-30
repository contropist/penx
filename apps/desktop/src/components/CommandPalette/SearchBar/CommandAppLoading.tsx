import { useCommandAppLoading } from '~/hooks/useCommandAppLoading'

export const CommandAppLoading = () => {
  const { loading } = useCommandAppLoading()
  if (!loading) return null
  return <hr command-palette-loader="" />
}

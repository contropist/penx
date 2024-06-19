import { useEffect } from 'react'
import { useOnMessage } from './useOnMessage'

export function useOnWindowMessage() {
  const onMessage = useOnMessage()
  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

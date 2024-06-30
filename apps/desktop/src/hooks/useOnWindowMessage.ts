import { useEffect } from 'react'
import { handleOnMessage } from '../common/handleOnMessage'

export function useOnWindowMessage() {
  useEffect(() => {
    window.addEventListener('message', handleOnMessage)
    return () => {
      window.removeEventListener('message', handleOnMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

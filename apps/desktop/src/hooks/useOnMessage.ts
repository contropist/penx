import {
  handleDetail,
  handleEscape,
  handleFilterChange,
  handleSearchChange,
  useHandleRender,
} from '~/api/app'
import { handleShellxSpawn } from '~/api/shell'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

export function useOnMessage() {
  const { setUI } = useCommandAppUI()

  const handlers = [
    // handleShellxSpawn,
    // app
    handleSearchChange,
    handleFilterChange,
    handleEscape,
    handleDetail,
    useHandleRender(setUI),
  ]
  return async (event: MessageEvent<any>) => {
    // if (event.ports.length === 0) {
    //   console.error('No ports found in message event:', event)
    //   return
    // }

    handlers.forEach((handler) => handler(event))
  }
}

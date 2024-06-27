import {
  handleDetail,
  handleEscape,
  handleFilterChange,
  handleRender,
  handleSearchChange,
} from '~/api/app'
import { handleShellxSpawn } from '~/api/shell'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'

const handlers = [
  // handleShellxSpawn,
  // app
  handleSearchChange,
  handleFilterChange,
  handleEscape,
  handleDetail,
  handleRender,
]

export function handleOnMessage(event: MessageEvent<any>) {
  handlers.forEach((handler) => handler(event))
}

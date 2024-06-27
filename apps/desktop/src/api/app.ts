import { constructAPICallbackExecuter, EventType } from '@penxio/preset-ui'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'
import { commandUIAtom } from '~/hooks/useCommandAppUI'
import { positionAtom } from '~/hooks/useCommandPosition'
import { currentCommandAtom } from '~/hooks/useCurrentCommand'
import { detailAtom } from '~/hooks/useDetail'

export function handleSearchChange(event: MessageEvent) {
  return constructAPICallbackExecuter<undefined>(EventType.InitOnSearchChange, () => {
    appEmitter.on('ON_COMMAND_PALETTE_SEARCH_CHANGE', (v) => {
      event.ports[0].postMessage({
        type: EventType.OnSearchChange,
        value: v,
      })
    })
  })(event)
}

export function handleFilterChange(event: MessageEvent) {
  return constructAPICallbackExecuter<undefined>(EventType.InitOnFilterChange, () => {
    appEmitter.on('ON_COMMAND_PALETTE_FILTER_CHANGE', (v) => {
      event.ports[0].postMessage({
        type: EventType.InitOnFilterChange,
        value: v,
      })
    })
  })(event)
}

type ComponentJSON = string

export function handleRender(event: MessageEvent) {
  return constructAPICallbackExecuter<ComponentJSON>(EventType.Render, (payload) => {
    if (event.data.type === EventType.Render) {
      store.set(commandUIAtom, {
        type: 'render',
        component: payload,
      })
    }
  })(event)
}

export function handleDetail(event: MessageEvent<{ type: string; isLoading: boolean; data: any }>) {
  if (event.data.type === 'detail') {
    store.set(detailAtom, {
      isLoading: event.data.isLoading,
      data: event.data.data,
    })
  }
}

export function handleEscape(event: MessageEvent<{ type: string }>) {
  if (event.data.type === 'escape') {
    store.set(positionAtom, 'ROOT')
    store.set(currentCommandAtom, null as any)
    store.set(commandUIAtom, {} as any)
  }
}

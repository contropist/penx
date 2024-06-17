import { constructAPICallbackExecuter, EventType, LoadingType } from 'penx'
import { appEmitter } from '@penx/event'

export function handleSearchChange(event: MessageEvent) {
  return constructAPICallbackExecuter<undefined>(
    EventType.InitOnSearchChange,
    () => {
      appEmitter.on('ON_COMMAND_PALETTE_SEARCH_CHANGE', (v) => {
        event.ports[0].postMessage({
          type: EventType.OnSearchChange,
          value: v,
        })
      })
    },
  )(event)
}

export function handleFilterChange(event: MessageEvent) {
  return constructAPICallbackExecuter<undefined>(
    EventType.InitOnFilterChange,
    () => {
      appEmitter.on('ON_COMMAND_PALETTE_FILTER_CHANGE', (v) => {
        event.ports[0].postMessage({
          type: EventType.InitOnFilterChange,
          value: v,
        })
      })
    },
  )(event)
}

export function useHandleLoading(
  setUI: (ui: { type: 'loading'; data: LoadingType }) => void,
) {
  return function handleLoading(event: MessageEvent) {
    return constructAPICallbackExecuter<LoadingType>(
      EventType.Loading,
      (payload) => {
        setUI({
          type: 'loading',
          data: payload,
        })
      },
    )(event)
  }
}

type ComponentJSON = string

export function useHandleRender(
  setUI: (ui: { type: 'render'; component: ComponentJSON }) => void,
) {
  return function handleLoading(event: MessageEvent) {
    return constructAPICallbackExecuter<ComponentJSON>(
      EventType.Render,
      (payload) => {
        console.log('payload', payload)

        setUI({
          type: 'render',
          component: payload,
        })
      },
    )(event)
  }
}

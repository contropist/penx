import { EventType } from './constants'

type Spinner = {
  type: 'spinner'
}

type Skeleton = {
  type: 'Skeleton'
}

export type LoadingType = Spinner | Skeleton

export function renderLoading(data: LoadingType) {
  postMessage({
    type: EventType.Loading,
    data: data,
  })
}

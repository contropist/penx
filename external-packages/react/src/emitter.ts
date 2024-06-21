import mitt from 'mitt'

export type Events = {
  ON_ACTION_SELECT?: undefined
}

export const emitter = mitt<Events>()

import { EventType } from './constants'

type HttpVerb =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  | 'TRACE'

interface Duration {
  secs: number
  nanos: number
}

interface HttpOptions {
  method: HttpVerb
  url: string
  headers?: Record<string, any>
  query?: Record<string, any>
  body?: Body
  timeout?: number | Duration
  responseType?: ResponseType

  json?: Record<string, any>
}

interface Response<T> {
  data: T
  headers: Record<string, string>
  rawheaders: Record<string, any>
  status: number
  url: string
  ok: boolean
}

export function request<T = any>(options: HttpOptions) {
  return new Promise<Response<T>>((resolve, reject) => {
    const channel = new MessageChannel()
    channel.port1.onmessage = (
      event: MessageEvent<{
        type: string
        result: any
      }>,
    ) => {
      if (event.data.type === EventType.HttpRequestResult) {
        resolve(event.data.result as Response<T>)
      } else {
        // TODO：
        reject(new Error('Unexpected message type'))
      }
    }
    // TODO: handle any
    self.postMessage(
      {
        type: EventType.HttpRequestInited,
        options,
      },
      [channel.port2] as any,
    )
  })
}

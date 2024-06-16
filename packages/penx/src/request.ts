/**
 * This module is a modified versioin of Tauri's official `http` plugin.
 * https://github.com/tauri-apps/plugins-workspace/blob/e162e811fe5f6787eddd2cacac24ab0701539b45/plugins/http/guest-js/index.ts#L103
 */
import { constructAPI } from './common'
import { EventType } from './constants'

export interface FetchSendResponse {
  status: number
  statusText: string
  headers: [[string, string]]
  url: string
  rid: number
}

export interface ProxyConfig {
  /**
   * The URL of the proxy server.
   */
  url: string
  /**
   * Set the `Proxy-Authorization` header using Basic auth.
   */
  basicAuth?: {
    username: string
    password: string
  }
  /**
   * A configuration for filtering out requests that shouldn't be proxied.
   * Entries are expected to be comma-separated (whitespace between entries is ignored)
   */
  noProxy?: string
}

/**
 * Configuration of a proxy that a Client should pass requests to.
 *
 * @since 2.0.0
 */
export interface Proxy {
  /**
   * Proxy all traffic to the passed URL.
   */
  all?: string | ProxyConfig
  /**
   * Proxy all HTTP traffic to the passed URL.
   */
  http?: string | ProxyConfig
  /**
   * Proxy all HTTPS traffic to the passed URL.
   */
  https?: string | ProxyConfig
}

// invoke<number>("plugin:http|fetch", {
export const rawFetch = constructAPI<any, number>(
  EventType.HttpRawFetch,
  EventType.HttpRawFetch,
)
export const fetchCancel = constructAPI<number, void>(
  EventType.HttpFetchCancel,
  EventType.HttpFetchCancel,
)
export const fetchSend = constructAPI<
  {
    rid: number
  },
  FetchSendResponse
>(EventType.HttpFetchSend, EventType.HttpFetchSend)
export const fetchReadBody = constructAPI<
  {
    rid: number
  },
  ArrayBuffer | number[]
>(EventType.HttpFetchReadBody, EventType.HttpFetchReadBody)
// invoke("plugin:http|fetch_cancel", {
// invoke<FetchSendResponse>("plugin:http|fetch_send", {
// invoke<ArrayBuffer | number[]>(

/**
 * Options to configure the Rust client used to make fetch requests
 *
 * @since 2.0.0
 */
export interface ClientOptions {
  /**
   * Defines the maximum number of redirects the client should follow.
   * If set to 0, no redirects will be followed.
   */
  maxRedirections?: number
  /** Timeout in milliseconds */
  connectTimeout?: number
  /**
   * Configuration of a proxy that a Client should pass requests to.
   */
  proxy?: Proxy
}

// type FetchParams = {
//   input: URL | Request | string
//   init?: RequestInit & ClientOptions
// }

// export const fetch = constructAPI<FetchParams, Response>(
//   EventType.HttpRequestInited,
//   EventType.HttpRequestResult,
// )

export async function fetch(
  input: URL | Request | string,
  init?: RequestInit & ClientOptions,
): Promise<Response> {
  const maxRedirections = init?.maxRedirections
  const connectTimeout = init?.connectTimeout
  const proxy = init?.proxy

  // Remove these fields before creating the request
  if (init != null) {
    delete init.maxRedirections
    delete init.connectTimeout
    delete init.proxy
  }

  const signal = init?.signal

  const headers =
    init?.headers == null
      ? []
      : init.headers instanceof Headers
        ? Array.from(init.headers.entries())
        : Array.isArray(init.headers)
          ? init.headers
          : Object.entries(init.headers)

  const mappedHeaders: Array<[string, string]> = headers.map(([name, val]) => [
    name,
    // we need to ensure we have all values as strings
    // eslint-disable-next-line
    typeof val === 'string' ? val : (val as any).toString(),
  ])

  const req = new Request(input, init)
  const buffer = await req.arrayBuffer()
  const reqData =
    buffer.byteLength !== 0 ? Array.from(new Uint8Array(buffer)) : null
  const rid = await rawFetch({
    clientConfig: {
      method: req.method,
      url: req.url,
      headers: mappedHeaders,
      data: reqData,
      maxRedirections,
      connectTimeout,
      proxy,
    },
  })
  // const rid = await invoke<number>('plugin:http|fetch', {
  //   clientConfig: {
  //     method: req.method,
  //     url: req.url,
  //     headers: mappedHeaders,
  //     data: reqData,
  //     maxRedirections,
  //     connectTimeout,
  //     proxy,
  //   },
  // })

  signal?.addEventListener('abort', () => {
    // void invoke('plugin:http|fetch_cancel', {
    //   rid,
    // })
    void fetchCancel(rid)
  })

  // const {
  //   status,
  //   statusText,
  //   url,
  //   headers: responseHeaders,
  //   rid: responseRid,
  // } = await invoke<FetchSendResponse>('plugin:http|fetch_send', {
  //   rid,
  // })

  const {
    status,
    statusText,
    url,
    headers: responseHeaders,
    rid: responseRid,
  } = await fetchSend({ rid })

  // const body = await invoke<ArrayBuffer | number[]>(
  //   'plugin:http|fetch_read_body',
  //   {
  //     rid: responseRid,
  //   },
  // )

  const body = await fetchReadBody({ rid: responseRid })

  const res = new Response(
    body instanceof ArrayBuffer && body.byteLength !== 0
      ? body
      : body instanceof Array && body.length > 0
        ? new Uint8Array(body)
        : null,
    {
      headers: responseHeaders,
      status,
      statusText,
    },
  )

  // url is read only but seems like we can do this
  Object.defineProperty(res, 'url', { value: url })

  return res
}

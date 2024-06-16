import { fetch as tauriFetch } from '@tauri-apps/plugin-http'
import { constructAPI } from './common'
import { EventType } from './constants'

type FetchParams = Parameters<typeof tauriFetch>

/**
 * !This fetch only supports json response due to the limitation of postMessage
 * @param args
 * @returns
 */
export const fetch = (...args: FetchParams) => {
  return constructAPI<FetchParams, any>(
    EventType.HttpRequestInited,
    EventType.HttpRequestResult,
  )(args)
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

// export async function fetch(
//   input: URL | Request | string,
//   init?: RequestInit & ClientOptions,
// ): Promise<Response> {
//   const maxRedirections = init?.maxRedirections;
//   const connectTimeout = init?.connectTimeout;
//   const proxy = init?.proxy;

//   // Remove these fields before creating the request
//   if (init) {
//     delete init.maxRedirections;
//     delete init.connectTimeout;
//     delete init.proxy;
//   }

//   const signal = init?.signal;

//   const headers = init?.headers
//     ? init.headers instanceof Headers
//       ? init.headers
//       : new Headers(init.headers)
//     : new Headers();

//   const req = new Request(input, init);
//   const buffer = await req.arrayBuffer();
//   const data =
//     buffer.byteLength !== 0 ? Array.from(new Uint8Array(buffer)) : null;

//   // append new headers created by the browser `Request` implementation,
//   // if not already declared by the caller of this function
//   for (const [key, value] of req.headers) {
//     if (!headers.get(key)) {
//       headers.set(key, value);
//     }
//   }

//   const headersArray =
//     headers instanceof Headers
//       ? Array.from(headers.entries())
//       : Array.isArray(headers)
//         ? headers
//         : Object.entries(headers);

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const mappedHeaders: Array<[string, string]> = headersArray.map(
//     ([name, val]) => [
//       name,
//       // we need to ensure we have all header values as strings
//       // eslint-disable-next-line
//       typeof val === "string" ? val : (val as any).toString(),
//     ],
//   );

//   const rid = await invoke<number>("plugin:http|fetch", {
//     clientConfig: {
//       method: req.method,
//       url: req.url,
//       headers: mappedHeaders,
//       data,
//       maxRedirections,
//       connectTimeout,
//       proxy,
//     },
//   });

//   signal?.addEventListener("abort", () => {
//     void invoke("plugin:http|fetch_cancel", {
//       rid,
//     });
//   });

//   interface FetchSendResponse {
//     status: number;
//     statusText: string;
//     headers: [[string, string]];
//     url: string;
//     rid: number;
//   }

//   const {
//     status,
//     statusText,
//     url,
//     headers: responseHeaders,
//     rid: responseRid,
//   } = await invoke<FetchSendResponse>("plugin:http|fetch_send", {
//     rid,
//   });

//   const body = await invoke<ArrayBuffer | number[]>(
//     "plugin:http|fetch_read_body",
//     {
//       rid: responseRid,
//     },
//   );

//   const res = new Response(
//     body instanceof ArrayBuffer && body.byteLength !== 0
//       ? body
//       : body instanceof Array && body.length > 0
//         ? new Uint8Array(body)
//         : null,
//     {
//       headers: responseHeaders,
//       status,
//       statusText,
//     },
//   );

//   // url is read only but seems like we can do this
//   Object.defineProperty(res, "url", { value: url });

//   return res;
// }

// type HttpVerb =
//   | 'GET'
//   | 'POST'
//   | 'PUT'
//   | 'DELETE'
//   | 'PATCH'
//   | 'HEAD'
//   | 'OPTIONS'
//   | 'CONNECT'
//   | 'TRACE'

// interface Duration {
//   secs: number
//   nanos: number
// }

// export interface HttpOptions {
//   method: HttpVerb
//   url: string
//   headers?: Record<string, any>
//   query?: Record<string, any>
//   body?: Body
//   timeout?: number | Duration
//   responseType?: ResponseType

//   json?: Record<string, any>
// }

// interface Response<T> {
//   data: T
//   headers: Record<string, string>
//   rawheaders: Record<string, any>
//   status: number
//   url: string
//   ok: boolean
// }

// export function request<T = any>(options: HttpOptions) {
//   return new Promise<Response<T>>((resolve, reject) => {
//     const channel = new MessageChannel()
//     channel.port1.onmessage = (
//       event: MessageEvent<{
//         type: string
//         result: any
//       }>,
//     ) => {
//       if (event.data.type === EventType.HttpRequestResult) {
//         resolve(event.data.result as Response<T>)
//       } else {
//         // TODO：
//         reject(new Error('Unexpected message type'))
//       }
//     }
//     // TODO: handle any
//     self.postMessage(
//       {
//         type: EventType.HttpRequestInited,
//         options,
//       },
//       [channel.port2] as any,
//     )
//   })
// }

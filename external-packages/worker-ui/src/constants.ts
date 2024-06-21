export enum EventType {
  Render = 'Render',

  RenderList = 'RenderList',
  RenderMarkdown = 'RenderMarkdown',
  Loading = 'Loading.',

  RunAppleScript = 'RunAppleScript',
  RunAppleScriptResult = 'RunAppleScriptResult',

  InitOnSearchChange = 'InitOnSearchChange',
  OnSearchChange = 'OnSearchChange',

  InitOnFilterChange = 'InitOnFilterChange',
  OnFilterChange = 'OnFilterChange',

  HttpRequestInited = 'HttpRequestInited',
  HttpRequestResult = 'HttpRequestResult',
  HttpRawFetch = 'HttpRawFetch',
  HttpFetchCancel = 'HttpFetchCancel',
  HttpFetchSend = 'HttpFetchSend',
  HttpFetchReadBody = 'HttpFetchReadBody',
}

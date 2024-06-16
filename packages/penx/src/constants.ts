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

  // Clipboard
  ClipboardHasText = 'ClipboardHasText',
  ClipboardHasImage = 'ClipboardHasImage',
  ClipboardHasHtml = 'ClipboardHasHtml',
  ClipboardHasRtf = 'ClipboardHasRtf',
  ClipboardHasFiles = 'ClipboardHasFiles',
  ClipboardWriteText = 'ClipboardWriteText',
  ClipboardWriteHtml = 'ClipboardWriteHtml',
  ClipboardWriteHtmlAndText = 'ClipboardWriteHtmlAndText',
  ClipboardWriteRtf = 'ClipboardWriteRtf',
  ClipboardWriteFilesUris = 'ClipboardWriteFilesUris',
  ClipboardWriteFiles = 'ClipboardWriteFiles',
  ClipboardClear = 'ClipboardClear',
  ClipboardReadText = 'ClipboardReadText',
  ClipboardReadHtml = 'ClipboardReadHtml',
  ClipboardReadRtf = 'ClipboardReadRtf',
  ClipboardReadFiles = 'ClipboardReadFiles',
  ClipboardReadFilesUris = 'ClipboardReadFilesUris',
  ClipboardReadImageBinary = 'ClipboardReadImageBinary',
  ClipboardReadImageBase64 = 'ClipboardReadImageBase64',
  ClipboardWriteImageBinary = 'ClipboardWriteImageBinary',
  ClipboardWriteImageBase64 = 'ClipboardWriteImageBase64',
}

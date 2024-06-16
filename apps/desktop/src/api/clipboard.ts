import { constructAPIExecuter, EventType } from 'penx'
import clipboard from 'tauri-plugin-clipboard-api'

export function handleClipboardReadText(event: MessageEvent) {
  return constructAPIExecuter<undefined, string>(
    EventType.ClipboardReadText,
    EventType.ClipboardReadTextResult,
    () => clipboard.readText(),
  )(event)
}

export function handleClipboardWriteText(event: MessageEvent) {
  return constructAPIExecuter<string, void>(
    EventType.ClipboardWriteText,
    EventType.ClipboardWriteTextResult,
    (payload) => clipboard.writeText(payload),
  )(event)
}

export function handleClipboardReadImageBase64(event: MessageEvent) {
  return constructAPIExecuter<undefined, string>(
    EventType.ClipboardReadImageBase64,
    EventType.ClipboardReadImageBase64Result,
    () => clipboard.readImageBase64(),
  )(event)
}

export function handleClipboardWriteImageBase64(event: MessageEvent) {
  return constructAPIExecuter<string, void>(
    EventType.ClipboardWriteImageBase64,
    EventType.ClipboardWriteImageBase64Result,
    (payload) => clipboard.writeImageBase64(payload),
  )(event)
}

export function handleClipboardReadFiles(event: MessageEvent) {
  return constructAPIExecuter<undefined, string[]>(
    EventType.ClipboardReadFiles,
    EventType.ClipboardReadFilesResult,
    () => clipboard.readFiles(),
  )(event)
}

export function handleClipboardWriteFiles(event: MessageEvent) {
  return constructAPIExecuter<string[], void>(
    EventType.ClipboardWriteText,
    EventType.ClipboardWriteTextResult,
    (payload) => clipboard.writeFiles(payload),
  )(event)
}

export function handleClipboardReadRtf(event: MessageEvent) {
  return constructAPIExecuter<undefined, string>(
    EventType.ClipboardReadRtf,
    EventType.ClipboardReadRtfResult,
    () => clipboard.readRtf(),
  )(event)
}

export function handleClipboardWriteRtf(event: MessageEvent) {
  return constructAPIExecuter<string, void>(
    EventType.ClipboardWriteRtf,
    EventType.ClipboardWriteRtfResult,
    (payload) => clipboard.writeRtf(payload),
  )(event)
}

export function handleClipboardReadHtml(event: MessageEvent) {
  return constructAPIExecuter<undefined, string>(
    EventType.ClipboardReadHtml,
    EventType.ClipboardReadHtmlResult,
    () => clipboard.readHtml(),
  )(event)
}

export function handleClipboardWriteHtml(event: MessageEvent) {
  return constructAPIExecuter<string, void>(
    EventType.ClipboardWriteHtml,
    EventType.ClipboardWriteHtmlResult,
    (payload) => clipboard.writeHtml(payload),
  )(event)
}

export function handleClipboardWriteHtmlAndText(event: MessageEvent) {
  return constructAPIExecuter<{ html: string; text: string }, void>(
    EventType.ClipboardWriteHtmlAndText,
    EventType.ClipboardWriteHtmlAndTextResult,
    (payload) => clipboard.writeHtmlAndText(payload.html, payload.text),
  )(event)
}

export function handleClipboardHasText(event: MessageEvent) {
  return constructAPIExecuter<undefined, boolean>(
    EventType.ClipboardHasText,
    EventType.ClipboardHasTextResult,
    () => clipboard.hasText(),
  )(event)
}
export function handleClipboardHasRtf(event: MessageEvent) {
  return constructAPIExecuter<undefined, boolean>(
    EventType.ClipboardHasRtf,
    EventType.ClipboardHasRtfResult,
    () => clipboard.hasRTF(),
  )(event)
}
export function handleClipboardHasHtml(event: MessageEvent) {
  return constructAPIExecuter<undefined, boolean>(
    EventType.ClipboardHasHtml,
    EventType.ClipboardHasHtmlResult,
    () => clipboard.hasHTML(),
  )(event)
}
export function handleClipboardHasImage(event: MessageEvent) {
  return constructAPIExecuter<undefined, boolean>(
    EventType.ClipboardHasImage,
    EventType.ClipboardHasImageResult,
    () => clipboard.hasImage(),
  )(event)
}
export function handleClipboardHasFiles(event: MessageEvent) {
  return constructAPIExecuter<undefined, boolean>(
    EventType.ClipboardHasFiles,
    EventType.ClipboardHasFilesResult,
    () => clipboard.hasFiles(),
  )(event)
}

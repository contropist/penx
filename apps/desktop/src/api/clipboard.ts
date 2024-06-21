// import { constructAPIExecuter, EventType } from 'penx'
// import clipboard from 'tauri-plugin-clipboard-api'

// export function handleClipboardReadText(event: MessageEvent) {
//   return constructAPIExecuter<undefined, string>(
//     EventType.ClipboardReadText,
//     () => clipboard.readText(),
//   )(event)
// }

// export function handleClipboardWriteText(event: MessageEvent) {
//   return constructAPIExecuter<string, void>(
//     EventType.ClipboardWriteText,
//     (payload) => clipboard.writeText(payload),
//   )(event)
// }

// export function handleClipboardReadImageBase64(event: MessageEvent) {
//   return constructAPIExecuter<undefined, string>(
//     EventType.ClipboardReadImageBase64,
//     () => clipboard.readImageBase64(),
//   )(event)
// }

// export function handleClipboardWriteImageBase64(event: MessageEvent) {
//   return constructAPIExecuter<string, void>(
//     EventType.ClipboardWriteImageBase64,
//     (payload) => clipboard.writeImageBase64(payload),
//   )(event)
// }

// export function handleClipboardReadFiles(event: MessageEvent) {
//   return constructAPIExecuter<undefined, string[]>(
//     EventType.ClipboardReadFiles,
//     () => clipboard.readFiles(),
//   )(event)
// }

// export function handleClipboardWriteFiles(event: MessageEvent) {
//   return constructAPIExecuter<string[], void>(
//     EventType.ClipboardWriteFiles,
//     (payload) => clipboard.writeFiles(payload),
//   )(event)
// }

// export function handleClipboardReadRtf(event: MessageEvent) {
//   return constructAPIExecuter<undefined, string>(
//     EventType.ClipboardReadRtf,
//     () => clipboard.readRtf(),
//   )(event)
// }

// export function handleClipboardWriteRtf(event: MessageEvent) {
//   return constructAPIExecuter<string, void>(
//     EventType.ClipboardWriteRtf,
//     (payload) => clipboard.writeRtf(payload),
//   )(event)
// }

// export function handleClipboardReadHtml(event: MessageEvent) {
//   return constructAPIExecuter<undefined, string>(
//     EventType.ClipboardReadHtml,
//     () => clipboard.readHtml(),
//   )(event)
// }

// export function handleClipboardWriteHtml(event: MessageEvent) {
//   return constructAPIExecuter<string, void>(
//     EventType.ClipboardWriteHtml,
//     (payload) => clipboard.writeHtml(payload),
//   )(event)
// }

// export function handleClipboardWriteHtmlAndText(event: MessageEvent) {
//   return constructAPIExecuter<{ html: string; text: string }, void>(
//     EventType.ClipboardWriteHtmlAndText,
//     (payload) => clipboard.writeHtmlAndText(payload.html, payload.text),
//   )(event)
// }

// export function handleClipboardHasText(event: MessageEvent) {
//   return constructAPIExecuter<undefined, boolean>(
//     EventType.ClipboardHasText,
//     () => clipboard.hasText(),
//   )(event)
// }
// export function handleClipboardHasRtf(event: MessageEvent) {
//   return constructAPIExecuter<undefined, boolean>(
//     EventType.ClipboardHasRtf,
//     () => clipboard.hasRTF(),
//   )(event)
// }
// export function handleClipboardHasHtml(event: MessageEvent) {
//   return constructAPIExecuter<undefined, boolean>(
//     EventType.ClipboardHasHtml,
//     () => clipboard.hasHTML(),
//   )(event)
// }
// export function handleClipboardHasImage(event: MessageEvent) {
//   return constructAPIExecuter<undefined, boolean>(
//     EventType.ClipboardHasImage,
//     () => clipboard.hasImage(),
//   )(event)
// }
// export function handleClipboardHasFiles(event: MessageEvent) {
//   return constructAPIExecuter<undefined, boolean>(
//     EventType.ClipboardHasFiles,
//     () => clipboard.hasFiles(),
//   )(event)
// }

import { constructAPI } from './common'
import { EventType } from './constants'

export const clipboard = {
  readText: constructAPI<undefined, string>(
    EventType.ClipboardReadText,
    EventType.ClipboardReadTextResult,
  ),
  writeText: constructAPI<string, void>(
    EventType.ClipboardWriteText,
    EventType.ClipboardWriteTextResult,
  ),
  readImageBase64: constructAPI<undefined, string>(
    EventType.ClipboardReadImageBase64,
    EventType.ClipboardReadImageBase64Result,
  ),
  writeImageBase64: constructAPI<string, void>(
    EventType.ClipboardWriteImageBase64,
    EventType.ClipboardWriteImageBase64Result,
  ),
  readFiles: constructAPI<undefined, string[]>(
    EventType.ClipboardReadFiles,
    EventType.ClipboardReadTextResult,
  ),
  writeFiles: constructAPI<string[], string>(
    EventType.ClipboardWriteFiles,
    EventType.ClipboardWriteTextResult,
  ),
  readRtf: constructAPI<undefined, string>(
    EventType.ClipboardReadRtf,
    EventType.ClipboardReadRtfResult,
  ),
  writeRtf: constructAPI<string, void>(
    EventType.ClipboardWriteRtf,
    EventType.ClipboardWriteRtfResult,
  ),
  readHtml: constructAPI<undefined, string>(
    EventType.ClipboardReadHtml,
    EventType.ClipboardReadHtmlResult,
  ),
  writeHtml: constructAPI<string, void>(
    EventType.ClipboardWriteHtml,
    EventType.ClipboardWriteHtmlResult,
  ),
  writeHtmlAndText: constructAPI<{ html: string; text: string }, void>(
    EventType.ClipboardWriteHtmlAndText,
    EventType.ClipboardWriteHtmlAndTextResult,
  ),
  hasText: constructAPI<void, boolean>(
    EventType.ClipboardHasText,
    EventType.ClipboardHasTextResult,
  ),
  hasRtf: constructAPI<void, boolean>(
    EventType.ClipboardHasRtf,
    EventType.ClipboardHasRtfResult,
  ),
  hasHtml: constructAPI<void, boolean>(
    EventType.ClipboardHasHtml,
    EventType.ClipboardHasHtmlResult,
  ),
  hasImage: constructAPI<void, boolean>(
    EventType.ClipboardHasImage,
    EventType.ClipboardHasImageResult,
  ),
  hasFiles: constructAPI<void, boolean>(
    EventType.ClipboardHasFiles,
    EventType.ClipboardHasFilesResult,
  ),
}

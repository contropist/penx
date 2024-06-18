import * as fs from '@tauri-apps/plugin-fs'
import {
  constructAPIExecuter,
  EventType,
  FsReadFilePayload,
  FsReadTextFilePayload,
} from 'penx'

export function handleFsReadFile(event: MessageEvent) {
  return constructAPIExecuter<FsReadFilePayload, Uint8Array>(
    EventType.FsReadFile,
    (payload) => fs.readFile(payload.path, payload.options),
  )(event)
}

export function handleFsReadTextFile(event: MessageEvent) {
  return constructAPIExecuter<FsReadTextFilePayload, string>(
    EventType.FsReadTextFile,
    (payload) => fs.readTextFile(payload.path, payload.options),
  )(event)
}

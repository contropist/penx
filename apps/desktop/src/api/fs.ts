// import * as fs from '@tauri-apps/plugin-fs'
// import {
//   constructAPIExecuter,
//   EventType,
//   FsCopyFilePayload,
//   FsCreatePayload,
//   FsExistsPayload,
//   FsLstatPayload,
//   FsMkdirPayload,
//   FsReadDirPayload,
//   FsReadFilePayload,
//   FsReadTextFilePayload,
//   FsRemovePayload,
//   FsRenamePayload,
//   FsStatPayload,
//   FsTruncatePayload,
//   FsWriteFilePayload,
//   FsWriteTextFilePayload,
// } from 'penx'

// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// export function handleFsReadFile(event: MessageEvent) {
//   return constructAPIExecuter<FsReadFilePayload, Uint8Array>(
//     EventType.FsReadFile,
//     (payload) => fs.readFile(payload.path, payload.options),
//   )(event)
// }
// export function handleFsTruncate(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsTruncatePayload,
//     UnwrapPromise<ReturnType<typeof fs.truncate>>
//   >(EventType.FsTruncate, (payload) =>
//     fs.truncate(payload.path, payload.len, payload.options),
//   )(event)
// }
// export function handleFsReadDir(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsReadDirPayload,
//     UnwrapPromise<ReturnType<typeof fs.readDir>>
//   >(EventType.FsReadDir, (payload) =>
//     fs.readDir(payload.path, payload.options),
//   )(event)
// }

// export function handleFsReadTextFile(event: MessageEvent) {
//   return constructAPIExecuter<FsReadTextFilePayload, string>(
//     EventType.FsReadTextFile,
//     (payload) => fs.readTextFile(payload.path, payload.options),
//   )(event)
// }
// export function handleFsStat(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsStatPayload,
//     UnwrapPromise<ReturnType<typeof fs.stat>>
//   >(EventType.FsStat, (payload) => fs.stat(payload.path, payload.options))(
//     event,
//   )
// }
// export function handleFsLStat(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsLstatPayload,
//     UnwrapPromise<ReturnType<typeof fs.lstat>>
//   >(EventType.FsLstat, (payload) => fs.lstat(payload.path, payload.options))(
//     event,
//   )
// }

// export function handleFsExists(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsExistsPayload,
//     UnwrapPromise<ReturnType<typeof fs.exists>>
//   >(EventType.FsExists, (payload) => fs.exists(payload.path, payload.options))(
//     event,
//   )
// }
// export function handleFsMkdir(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsMkdirPayload,
//     UnwrapPromise<ReturnType<typeof fs.mkdir>>
//   >(EventType.FsMkdir, (payload) => fs.mkdir(payload.path, payload.options))(
//     event,
//   )
// }
// export function handleFsCreate(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsCreatePayload,
//     UnwrapPromise<ReturnType<typeof fs.create>>
//   >(EventType.FsCreate, (payload) => fs.create(payload.path, payload.options))(
//     event,
//   )
// }
// export function handleFsCopyFile(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsCopyFilePayload,
//     UnwrapPromise<ReturnType<typeof fs.copyFile>>
//   >(EventType.FsCopyFile, (payload) =>
//     fs.copyFile(payload.fromPath, payload.toPath, payload.options),
//   )(event)
// }
// export function handleFsRemove(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsRemovePayload,
//     UnwrapPromise<ReturnType<typeof fs.remove>>
//   >(EventType.FsRemove, (payload) => fs.remove(payload.path, payload.options))(
//     event,
//   )
// }
// export function handleFsRename(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsRenamePayload,
//     UnwrapPromise<ReturnType<typeof fs.rename>>
//   >(EventType.FsRename, (payload) =>
//     fs.rename(payload.oldPath, payload.newPath, payload.options),
//   )(event)
// }
// export function handleFsWriteFile(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsWriteFilePayload,
//     UnwrapPromise<ReturnType<typeof fs.writeFile>>
//   >(EventType.FsWriteFile, (payload) =>
//     fs.writeFile(payload.path, payload.data, payload.options),
//   )(event)
// }
// export function handleFsWriteTextFile(event: MessageEvent) {
//   return constructAPIExecuter<
//     FsWriteTextFilePayload,
//     UnwrapPromise<ReturnType<typeof fs.writeTextFile>>
//   >(EventType.FsWriteTextFile, (payload) =>
//     fs.writeTextFile(payload.path, payload.data, payload.options),
//   )(event)
// }

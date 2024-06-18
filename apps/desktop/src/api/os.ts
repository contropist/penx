import * as os from '@tauri-apps/plugin-os'
import { constructAPIExecuter, EventType } from 'penx'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export function handleOsPlatform(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.platform>>
  >(EventType.OsPlatform, (payload) => os.platform())(event)
}
export function handleOsArch(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.arch>>
  >(EventType.OsArch, (payload) => os.arch())(event)
}
export function handleOsExeExtension(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.exeExtension>>
  >(EventType.OsExeExtension, (payload) => os.exeExtension())(event)
}
export function handleOsFamily(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.family>>
  >(EventType.OsFamily, (payload) => os.family())(event)
}
export function handleOsHostname(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.hostname>>
  >(EventType.OsHostname, (payload) => os.hostname())(event)
}
export function handleOsEol(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.eol>>
  >(EventType.OsEol, (payload) => Promise.resolve(os.eol()))(event)
}
export function handleOsVersion(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.version>>
  >(EventType.OsVersion, (payload) => os.version())(event)
}
export function handleOsLocale(event: MessageEvent) {
  return constructAPIExecuter<
    undefined,
    UnwrapPromise<ReturnType<typeof os.locale>>
  >(EventType.OsLocale, (payload) => os.locale())(event)
}

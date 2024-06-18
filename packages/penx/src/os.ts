import osApi from '@tauri-apps/plugin-os'
import { constructAPI } from './common'
import { EventType } from './constants'
import { UnwrapPromise } from './type'

export interface IOs {
  platform: () => ReturnType<typeof osApi.platform>
  arch: () => ReturnType<typeof osApi.arch>
  exeExtension: () => ReturnType<typeof osApi.exeExtension>
  family: () => ReturnType<typeof osApi.family>
  hostname: () => ReturnType<typeof osApi.hostname>
  eol: () => Promise<string>
  version: () => ReturnType<typeof osApi.version>
  locale: () => ReturnType<typeof osApi.locale>
}

export const os: IOs = {
  platform: function (): ReturnType<typeof osApi.platform> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.platform>>
    >(EventType.OsPlatform)()
  },
  arch: function (): ReturnType<typeof osApi.arch> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.arch>>
    >(EventType.OsArch)()
  },
  exeExtension: function (): ReturnType<typeof osApi.exeExtension> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.exeExtension>>
    >(EventType.OsExeExtension)()
  },
  family: function (): ReturnType<typeof osApi.family> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.family>>
    >(EventType.OsFamily)()
  },
  hostname: function (): ReturnType<typeof osApi.hostname> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.hostname>>
    >(EventType.OsHostname)()
  },
  eol: function (): Promise<string> {
    return constructAPI<undefined, string>(EventType.OsEol)()
  },
  version: function (): ReturnType<typeof osApi.version> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.version>>
    >(EventType.OsVersion)()
  },
  locale: function (): ReturnType<typeof osApi.locale> {
    return constructAPI<
      undefined,
      UnwrapPromise<ReturnType<typeof osApi.locale>>
    >(EventType.OsLocale)()
  },
}

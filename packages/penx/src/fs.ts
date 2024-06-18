import fsApi from '@tauri-apps/plugin-fs'
import { constructAPI } from './common'
import { EventType } from './constants'

// const apis = [
//   fsApi.readDir,
//   fsApi.readFile,
//   fsApi.open,
//   fsApi.readTextFile,
//   fsApi.readTextFileLines,
//   fsApi.stat,
//   fsApi.lstat,
//   fsApi.exists,
//   fsApi.watch,
//   fsApi.mkdir,
//   fsApi.create,
//   fsApi.copyFile,
//   fsApi.remove,
//   fsApi.rename,
//   fsApi.truncate,
//   fsApi.writeFile,
//   fsApi.writeTextFile,
// ]
// fsApi.open
export interface IFs {
  //   readDir: (
  //     ...args: Parameters<typeof fsApi.readDir>
  //   ) => ReturnType<typeof fsApi.readDir>
  readFile: (
    ...args: Parameters<typeof fsApi.readFile>
  ) => ReturnType<typeof fsApi.readFile>
  readTextFile: (
    ...args: Parameters<typeof fsApi.readTextFile>
  ) => ReturnType<typeof fsApi.readTextFile>
  //   readTextFileLines: (
  //     ...args: Parameters<typeof fsApi.readTextFileLines>
  //   ) => ReturnType<typeof fsApi.readTextFileLines>
  //   stat: (
  //     ...args: Parameters<typeof fsApi.stat>
  //   ) => ReturnType<typeof fsApi.stat>
  //   lstat: (
  //     ...args: Parameters<typeof fsApi.lstat>
  //   ) => ReturnType<typeof fsApi.lstat>
  //   exists: (
  //     ...args: Parameters<typeof fsApi.exists>
  //   ) => ReturnType<typeof fsApi.exists>
  //   mkdir: (
  //     ...args: Parameters<typeof fsApi.mkdir>
  //   ) => ReturnType<typeof fsApi.mkdir>
  //   create: (
  //     ...args: Parameters<typeof fsApi.create>
  //   ) => ReturnType<typeof fsApi.create>
  //   copyFile: (
  //     ...args: Parameters<typeof fsApi.copyFile>
  //   ) => ReturnType<typeof fsApi.copyFile>
  //   remove: (
  //     ...args: Parameters<typeof fsApi.remove>
  //   ) => ReturnType<typeof fsApi.remove>
  //   rename: (
  //     ...args: Parameters<typeof fsApi.rename>
  //   ) => ReturnType<typeof fsApi.rename>
  //   truncate: (
  //     ...args: Parameters<typeof fsApi.truncate>
  //   ) => ReturnType<typeof fsApi.truncate>
  //   writeFile: (
  //     ...args: Parameters<typeof fsApi.writeFile>
  //   ) => ReturnType<typeof fsApi.writeFile>
  //   writeTextFile: (
  //     ...args: Parameters<typeof fsApi.writeTextFile>
  //   ) => ReturnType<typeof fsApi.writeTextFile>
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type FsReadFilePayload = {
  path: string | URL
  options?: fsApi.ReadFileOptions | undefined
}
export type FsReadTextFilePayload = {
  path: string | URL
  options?: fsApi.ReadFileOptions | undefined
}
export const fs: IFs = {
  //   readDir: function (
  //     path: string | URL,
  //     options?: fsApi.ReadDirOptions | undefined,
  //   ): ReturnType<typeof fsApi.readDir> {
  //     throw new Error('Function not implemented.')
  //   },
  readFile: function (
    path: string | URL,
    options?: fsApi.ReadFileOptions | undefined,
  ): ReturnType<typeof fsApi.readFile> {
    return constructAPI<
      FsReadFilePayload,
      UnwrapPromise<ReturnType<typeof fsApi.readFile>>
    >(EventType.FsReadFile)({
      path,
      options,
    })
  },
  readTextFile: function (
    path: string | URL,
    options?: fsApi.ReadFileOptions | undefined,
  ): ReturnType<typeof fsApi.readTextFile> {
    return constructAPI<
      FsReadTextFilePayload,
      UnwrapPromise<ReturnType<typeof fsApi.readTextFile>>
    >(EventType.FsReadTextFile)({
      path,
      options,
    })
  },
  //   readTextFileLines: function (
  //     path: string | URL,
  //     options?: fsApi.ReadFileOptions | undefined,
  //   ): ReturnType<typeof fsApi.readTextFileLines> {
  //     throw new Error('Function not implemented.')
  //   },
  //   stat: function (
  //     path: string | URL,
  //     options?: fsApi.StatOptions | undefined,
  //   ): ReturnType<typeof fsApi.stat> {
  //     throw new Error('Function not implemented.')
  //   },
  //   lstat: function (
  //     path: string | URL,
  //     options?: fsApi.StatOptions | undefined,
  //   ): ReturnType<typeof fsApi.lstat> {
  //     throw new Error('Function not implemented.')
  //   },
  //   exists: function (
  //     path: string | URL,
  //     options?: fsApi.ExistsOptions | undefined,
  //   ): ReturnType<typeof fsApi.exists> {
  //     throw new Error('Function not implemented.')
  //   },
  //   mkdir: function (
  //     path: string | URL,
  //     options?: fsApi.MkdirOptions | undefined,
  //   ): ReturnType<typeof fsApi.mkdir> {
  //     throw new Error('Function not implemented.')
  //   },
  //   create: function (
  //     path: string | URL,
  //     options?: fsApi.CreateOptions | undefined,
  //   ): ReturnType<typeof fsApi.create> {
  //     throw new Error('Function not implemented.')
  //   },
  //   copyFile: function (
  //     fromPath: string | URL,
  //     toPath: string | URL,
  //     options?: fsApi.CopyFileOptions | undefined,
  //   ): ReturnType<typeof fsApi.copyFile> {
  //     throw new Error('Function not implemented.')
  //   },
  //   remove: function (
  //     path: string | URL,
  //     options?: fsApi.RemoveOptions | undefined,
  //   ): ReturnType<typeof fsApi.remove> {
  //     throw new Error('Function not implemented.')
  //   },
  //   rename: function (
  //     oldPath: string | URL,
  //     newPath: string | URL,
  //     options?: fsApi.RenameOptions | undefined,
  //   ): ReturnType<typeof fsApi.rename> {
  //     throw new Error('Function not implemented.')
  //   },
  //   truncate: function (
  //     path: string | URL,
  //     len?: number | undefined,
  //     options?: fsApi.TruncateOptions | undefined,
  //   ): ReturnType<typeof fsApi.truncate> {
  //     throw new Error('Function not implemented.')
  //   },
  //   writeFile: function (
  //     path: string | URL,
  //     data: Uint8Array,
  //     options?: fsApi.WriteFileOptions | undefined,
  //   ): ReturnType<typeof fsApi.writeFile> {
  //     throw new Error('Function not implemented.')
  //   },
  //   writeTextFile: function (
  //     path: string | URL,
  //     data: string,
  //     options?: fsApi.WriteFileOptions | undefined,
  //   ): ReturnType<typeof fsApi.writeTextFile> {
  //     throw new Error('Function not implemented.')
  //   },
}

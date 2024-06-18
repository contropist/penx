import fsApi from '@tauri-apps/plugin-fs'
import { constructAPI } from './common'
import { EventType } from './constants'
import { UnwrapPromise } from './type'

export interface IFs {
  readDir: (
    ...args: Parameters<typeof fsApi.readDir>
  ) => ReturnType<typeof fsApi.readDir>
  readFile: (
    ...args: Parameters<typeof fsApi.readFile>
  ) => ReturnType<typeof fsApi.readFile>
  readTextFile: (
    ...args: Parameters<typeof fsApi.readTextFile>
  ) => ReturnType<typeof fsApi.readTextFile>
  //   readTextFileLines: (
  //     ...args: Parameters<typeof fsApi.readTextFileLines>
  //   ) => ReturnType<typeof fsApi.readTextFileLines>
  stat: (
    ...args: Parameters<typeof fsApi.stat>
  ) => ReturnType<typeof fsApi.stat>
  lstat: (
    ...args: Parameters<typeof fsApi.lstat>
  ) => ReturnType<typeof fsApi.lstat>
  exists: (
    ...args: Parameters<typeof fsApi.exists>
  ) => ReturnType<typeof fsApi.exists>
  mkdir: (
    ...args: Parameters<typeof fsApi.mkdir>
  ) => ReturnType<typeof fsApi.mkdir>
  create: (
    ...args: Parameters<typeof fsApi.create>
  ) => ReturnType<typeof fsApi.create>
  copyFile: (
    ...args: Parameters<typeof fsApi.copyFile>
  ) => ReturnType<typeof fsApi.copyFile>
  remove: (
    ...args: Parameters<typeof fsApi.remove>
  ) => ReturnType<typeof fsApi.remove>
  rename: (
    ...args: Parameters<typeof fsApi.rename>
  ) => ReturnType<typeof fsApi.rename>
  truncate: (
    ...args: Parameters<typeof fsApi.truncate>
  ) => ReturnType<typeof fsApi.truncate>
  writeFile: (
    ...args: Parameters<typeof fsApi.writeFile>
  ) => ReturnType<typeof fsApi.writeFile>
  writeTextFile: (
    ...args: Parameters<typeof fsApi.writeTextFile>
  ) => ReturnType<typeof fsApi.writeTextFile>
}
export type FsReadFilePayload = {
  path: string | URL
  options?: fsApi.ReadFileOptions
}
export type FsReadTextFilePayload = {
  path: string | URL
  options?: fsApi.ReadFileOptions
}
export type FsStatPayload = {
  path: string | URL
  options?: fsApi.StatOptions
}
export type FsExistsPayload = {
  path: string | URL
  options?: fsApi.ExistsOptions
}
export type FsMkdirPayload = {
  path: string | URL
  options?: fsApi.MkdirOptions
}
export type FsCreatePayload = {
  path: string | URL
  options?: fsApi.CreateOptions
}
export type FsCopyFilePayload = {
  fromPath: string | URL
  toPath: string | URL
  options?: fsApi.CopyFileOptions
}

export type FsRemovePayload = {
  path: string | URL
  options?: fsApi.RemoveOptions
}

export type FsRenamePayload = {
  oldPath: string | URL
  newPath: string | URL
  options?: fsApi.RenameOptions
}

export type FsWriteFilePayload = {
  path: string | URL
  data: Uint8Array
  options?: fsApi.WriteFileOptions
}

export type FsWriteTextFilePayload = {
  path: string | URL
  data: string
  options?: fsApi.WriteFileOptions
}

export type FsTruncatePayload = {
  path: string | URL
  len?: number | undefined
  options?: fsApi.TruncateOptions
}

export type FsLstatPayload = {
  path: string | URL
  options?: fsApi.StatOptions
}

export type FsReadDirPayload = {
  path: string | URL
  options?: fsApi.ReadDirOptions
}

export const fs: IFs = {
  readDir: function (
    path: string | URL,
    options?: fsApi.ReadDirOptions,
  ): ReturnType<typeof fsApi.readDir> {
    return constructAPI<
      FsReadDirPayload,
      UnwrapPromise<ReturnType<typeof fsApi.readDir>>
    >(EventType.FsReadDir)({
      path,
      options,
    })
  },
  readFile: function (
    path: string | URL,
    options?: fsApi.ReadFileOptions,
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
    options?: fsApi.ReadFileOptions,
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
  stat: function (
    path: string | URL,
    options?: fsApi.StatOptions,
  ): ReturnType<typeof fsApi.stat> {
    return constructAPI<
      FsStatPayload,
      UnwrapPromise<ReturnType<typeof fsApi.stat>>
    >(EventType.FsStat)({
      path,
      options,
    })
  },
  lstat: function (
    path: string | URL,
    options?: fsApi.StatOptions,
  ): ReturnType<typeof fsApi.lstat> {
    return constructAPI<
      FsStatPayload,
      UnwrapPromise<ReturnType<typeof fsApi.lstat>>
    >(EventType.FsLstat)({
      path,
      options,
    })
  },
  exists: function (
    path: string | URL,
    options?: fsApi.ExistsOptions,
  ): ReturnType<typeof fsApi.exists> {
    return constructAPI<
      FsExistsPayload,
      UnwrapPromise<ReturnType<typeof fsApi.exists>>
    >(EventType.FsExists)({
      path,
      options,
    })
  },
  mkdir: function (
    path: string | URL,
    options?: fsApi.MkdirOptions,
  ): ReturnType<typeof fsApi.mkdir> {
    return constructAPI<
      FsMkdirPayload,
      UnwrapPromise<ReturnType<typeof fsApi.mkdir>>
    >(EventType.FsMkdir)({
      path,
      options,
    })
  },
  create: function (
    path: string | URL,
    options?: fsApi.CreateOptions,
  ): ReturnType<typeof fsApi.create> {
    return constructAPI<
      FsCreatePayload,
      UnwrapPromise<ReturnType<typeof fsApi.create>>
    >(EventType.FsCreate)({
      path,
      options,
    })
  },
  copyFile: function (
    fromPath: string | URL,
    toPath: string | URL,
    options?: fsApi.CopyFileOptions,
  ): ReturnType<typeof fsApi.copyFile> {
    return constructAPI<
      FsCopyFilePayload,
      UnwrapPromise<ReturnType<typeof fsApi.copyFile>>
    >(EventType.FsCopyFile)({
      fromPath,
      toPath,
      options,
    })
  },
  remove: function (
    path: string | URL,
    options?: fsApi.RemoveOptions,
  ): ReturnType<typeof fsApi.remove> {
    return constructAPI<
      FsRemovePayload,
      UnwrapPromise<ReturnType<typeof fsApi.remove>>
    >(EventType.FsRemove)({
      path,
      options,
    })
  },
  rename: function (
    oldPath: string | URL,
    newPath: string | URL,
    options?: fsApi.RenameOptions,
  ): ReturnType<typeof fsApi.rename> {
    return constructAPI<
      FsRenamePayload,
      UnwrapPromise<ReturnType<typeof fsApi.rename>>
    >(EventType.FsRename)({
      oldPath,
      newPath,
      options,
    })
  },
  truncate: function (
    path: string | URL,
    len?: number,
    options?: fsApi.TruncateOptions,
  ): ReturnType<typeof fsApi.truncate> {
    return constructAPI<
      FsTruncatePayload,
      UnwrapPromise<ReturnType<typeof fsApi.truncate>>
    >(EventType.FsTruncate)({
      path,
      len,
      options,
    })
  },
  writeFile: function (
    path: string | URL,
    data: Uint8Array,
    options?: fsApi.WriteFileOptions,
  ): ReturnType<typeof fsApi.writeFile> {
    return constructAPI<
      FsWriteFilePayload,
      UnwrapPromise<ReturnType<typeof fsApi.writeFile>>
    >(EventType.FsWriteFile)({
      path,
      data,
      options,
    })
  },
  writeTextFile: function (
    path: string | URL,
    data: string,
    options?: fsApi.WriteFileOptions,
  ): ReturnType<typeof fsApi.writeTextFile> {
    return constructAPI<
      FsWriteTextFilePayload,
      UnwrapPromise<ReturnType<typeof fsApi.writeTextFile>>
    >(EventType.FsWriteTextFile)({
      path,
      data,
      options,
    })
  },
}
// export { BaseDirectory, FileHandle, SeekMode } from '@tauri-apps/plugin-fs'

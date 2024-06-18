import fsApi from '@tauri-apps/plugin-fs'

// import { constructAPI } from './common'
// import { EventType } from './constants'

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
  open: (
    ...args: Parameters<typeof fsApi.open>
  ) => ReturnType<typeof fsApi.open>
}

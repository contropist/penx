/**
 * This file defines API interfaces for client. The client is the side that calls the API.
 * For example, the client can call the APIs from an iframe.
 */
import { FetchOptions, FetchSendResponse } from '@/api/fetch/types'
import * as _event from '@tauri-apps/api/event'
import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'
import * as notification from '@tauri-apps/plugin-notification'
import * as os from '@tauri-apps/plugin-os'
import * as clipboard from 'tauri-plugin-clipboard-api'
import * as shellx from 'tauri-plugin-shellx-api'

/* -------------------------------------------------------------------------- */
/*                                    Event                                   */
/* -------------------------------------------------------------------------- */
export interface IEventInternal {
  rawListen<T>(
    event: _event.EventName,
    target: _event.EventTarget,
    handler: _event.EventCallback<T>,
  ): Promise<number>
  rawUnlisten(event: string, eventId: number): Promise<void>
  emit: typeof _event.emit
  emitTo: typeof _event.emitTo
  once: typeof _event.once
}

export interface IEvent {
  emit: typeof _event.emit
  emitTo: typeof _event.emitTo
  once: typeof _event.once
  listen: typeof _event.listen
}

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */
export interface IDialog {
  ask: typeof dialog.ask
  confirm: typeof dialog.confirm
  message: typeof dialog.message
  open(options?: dialog.OpenDialogOptions): ReturnType<typeof dialog.open>
  save: typeof dialog.save
}

export interface IClipboard {
  readText: typeof clipboard.readText
  writeText: typeof clipboard.writeText
  readImageBase64: typeof clipboard.readImageBase64
  readImageBinary: typeof clipboard.readImageBinary
  writeImageBase64: typeof clipboard.writeImageBase64
  writeImageBinary: typeof clipboard.writeImageBinary
  readFiles: typeof clipboard.readFiles
  writeFiles: typeof clipboard.writeFiles
  readRtf: typeof clipboard.readRtf
  writeRtf: typeof clipboard.writeRtf
  readHtml: typeof clipboard.readHtml
  writeHtml: typeof clipboard.writeHtml
  writeHtmlAndText: typeof clipboard.writeHtmlAndText
  hasText: typeof clipboard.hasText
  hasRTF: typeof clipboard.hasRTF
  hasHTML: typeof clipboard.hasHTML
  hasImage: typeof clipboard.hasImage
  hasFiles: typeof clipboard.hasFiles
  startMonitor: typeof clipboard.startMonitor
}

export interface INotification {
  isPermissionGranted: typeof notification.isPermissionGranted
  requestPermission: typeof notification.requestPermission
  sendNotification: typeof notification.sendNotification
  registerActionTypes: typeof notification.registerActionTypes
  pending: typeof notification.pending
  cancel: typeof notification.cancel
  cancelAll: typeof notification.cancelAll
  active: typeof notification.active
  removeActive: typeof notification.removeActive
  removeAllActive: typeof notification.removeAllActive
  createChannel: typeof notification.createChannel
  removeChannel: typeof notification.removeChannel
  channels: typeof notification.channels
  onNotificationReceived: typeof notification.onNotificationReceived
  onAction: typeof notification.onAction
}

export interface IFs {
  readDir: typeof fs.readDir
  readFile: typeof fs.readFile
  readTextFile: typeof fs.readTextFile
  stat: typeof fs.stat
  lstat: typeof fs.lstat
  exists: typeof fs.exists
  mkdir: typeof fs.mkdir
  create: typeof fs.create
  copyFile: typeof fs.copyFile
  remove: typeof fs.remove
  rename: typeof fs.rename
  truncate: typeof fs.truncate
  writeFile: typeof fs.writeFile
  writeTextFile: typeof fs.writeTextFile
}

export interface IOs {
  platform: typeof os.platform
  arch: typeof os.arch
  exeExtension: typeof os.exeExtension
  family: typeof os.family
  hostname: typeof os.hostname
  eol: () => Promise<string>
  version: typeof os.version
  locale: typeof os.locale
}

export interface IShellInternal {
  execute(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
  ): Promise<shellx.ChildProcess<shellx.IOPayload>>
  kill(pid: number): Promise<void>
  stdinWrite(buffer: string | number[], pid: number): Promise<void>
  rawSpawn<O extends shellx.IOPayload>(
    program: string,
    args: string[],
    options: shellx.InternalSpawnOptions,
    cb: (evt: shellx.CommandEvent<O>) => void,
  ): Promise<number>
  open: typeof shellx.open
  makeBashScript: typeof shellx.makeBashScript
  makePowershellScript: typeof shellx.makePowershellScript
  makeAppleScript: typeof shellx.makeAppleScript
  makePythonScript: typeof shellx.makePythonScript
  makeZshScript: typeof shellx.makeZshScript
  makeNodeScript: typeof shellx.makeNodeScript
  executeBashScript: typeof shellx.executeBashScript
  executePowershellScript: typeof shellx.executePowershellScript
  executeAppleScript: typeof shellx.executeAppleScript
  executePythonScript: typeof shellx.executePythonScript
  executeZshScript: typeof shellx.executeZshScript
  executeNodeScript: typeof shellx.executeNodeScript
  hasCommand: typeof shellx.hasCommand
  likelyOnWindows: typeof shellx.likelyOnWindows
}

export interface IShell {
  open: typeof shellx.open
  makeBashScript: typeof shellx.makeBashScript
  makePowershellScript: typeof shellx.makePowershellScript
  makeAppleScript: typeof shellx.makeAppleScript
  makePythonScript: typeof shellx.makePythonScript
  makeZshScript: typeof shellx.makeZshScript
  makeNodeScript: typeof shellx.makeNodeScript
  executeBashScript: typeof shellx.executeBashScript
  executePowershellScript: typeof shellx.executePowershellScript
  executeAppleScript: typeof shellx.executeAppleScript
  executePythonScript: typeof shellx.executePythonScript
  executeZshScript: typeof shellx.executeZshScript
  executeNodeScript: typeof shellx.executeNodeScript
  hasCommand: typeof shellx.hasCommand
  likelyOnWindows: typeof shellx.likelyOnWindows
  Command: typeof shellx.Command
  Child: typeof shellx.Child
}

export interface IFetch {
  rawFetch(options: FetchOptions): Promise<number>
  fetchCancel(rid: number): Promise<void>
  fetchSend(rid: number): Promise<FetchSendResponse>
  fetchReadBody(rid: number): Promise<ArrayBuffer | number[]>
}

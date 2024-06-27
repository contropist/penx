import * as Comlink from '@huakunshen/comlink'
import * as shellx from 'tauri-plugin-shellx-api'
import { IOPayload } from 'tauri-plugin-shellx-api'
import { IShell } from './apiTypes'
import { clientApi } from './comlink'

function makeBashScript(script: string): Command<string> {
  return Command.create('bash', ['-c', script])
}

function makePowershellScript(script: string): Command<string> {
  return Command.create('powershell', ['-Command', script])
}

function makeAppleScript(script: string): Command<string> {
  return Command.create('osascript', ['-e', script])
}

function makePythonScript(script: string): Command<string> {
  return Command.create('python', ['-c', script])
}

function makeZshScript(script: string): Command<string> {
  return Command.create('zsh', ['-c', script])
}

function makeNodeScript(script: string): Command<string> {
  return Command.create('node', ['-e', script])
}

export const shell: IShell = {
  execute: clientApi.shellExecute,
  kill: clientApi.shellKill,
  stdinWrite: clientApi.shellStdinWrite,
  open: clientApi.shellOpen,
  rawSpawn: clientApi.shellRawSpawn,
  makeBashScript,
  makePowershellScript,
  makeAppleScript,
  makePythonScript,
  makeZshScript,
  makeNodeScript,
  executeBashScript: clientApi.shellExecuteBashScript,
  executePowershellScript: clientApi.shellExecutePowershellScript,
  executeAppleScript: clientApi.shellExecuteAppleScript,
  executePythonScript: clientApi.shellExecutePythonScript,
  executeZshScript: clientApi.shellExecuteZshScript,
  executeNodeScript: clientApi.shellExecuteNodeScript,
  hasCommand: clientApi.shellHasCommand,
  likelyOnWindows: clientApi.shellLikelyOnWindows,
}

export const shellOpen = shell.open

export class Child extends shellx.Child {
  write(data: IOPayload): Promise<void> {
    return shell.stdinWrite(typeof data === 'string' ? data : Array.from(data), this.pid)
  }

  kill(): Promise<void> {
    return shell.kill(this.pid)
  }
}

export class Command<O extends IOPayload> extends shellx.Command<O> {
  static create<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: shellx.SpawnOptions,
  ): Command<O> {
    return new Command(program, args, options)
  }

  async spawn(): Promise<Child> {
    const args = this.args

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    return shell
      .rawSpawn<O>(
        this.program,
        args,
        this.options,
        Comlink.proxy((evt) => {
          switch (evt.event) {
            case 'Error':
              this.emit('error', evt.payload)
              break
            case 'Terminated':
              this.emit('close', evt.payload)
              break
            case 'Stdout':
              this.stdout.emit('data', evt.payload)
              break
            case 'Stderr':
              this.stderr.emit('data', evt.payload)
              break
          }
        }),
      )
      .then((pid) => new Child(pid))
  }

  async execute(): Promise<shellx.ChildProcess<O>> {
    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }
    // return shellxExecute({ program, args, options }) as Promise<shellx.ChildProcess<O>>
    return shell.execute(program, args, options) as Promise<shellx.ChildProcess<O>>
  }
}

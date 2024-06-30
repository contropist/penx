import { invoke } from '@tauri-apps/api/core'
import { z } from 'zod'

export const ScriptOutput = z.object({
  stdout: z.string(),
  stderr: z.string(),
})
export type ScriptOutput = z.infer<typeof ScriptOutput>

export function runAppleScript(script: string) {
  return invoke<ScriptOutput>('plugin:jarvis|run_apple_script', { script })
}

export function runPowershell(script: string) {
  return invoke<ScriptOutput>('plugin:jarvis|run_powershell', { script })
}

export function runScript(command: string, args: string[]) {
  return invoke<ScriptOutput>('plugin:jarvis|run_script', { command, args })
}

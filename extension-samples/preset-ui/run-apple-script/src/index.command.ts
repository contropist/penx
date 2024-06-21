import { MarkdownBuilder, render, runAppleScript } from 'penx'

export async function main() {
  // const script = 'return "unicorn"'
  const script1 = 'display notification "Hello World" with title "Notification"'
  const res = await runAppleScript(script1)
  render(new MarkdownBuilder('# hello world. ' + res))
}

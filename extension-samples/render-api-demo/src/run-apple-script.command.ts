import { MarkdownBuilder, render, runAppleScript, clipboard } from 'penx'

export async function main() {
  // const script = 'return "unicorn"'
  // const script1 = 'display notification "Hello World" with title "Notification"'
  // const res = await runAppleScript(script1)
  const cbText = await clipboard.readText(undefined)
  console.log('cbText: ', cbText)

  const res = await runAppleScript(
    `
      on run argv
        return "hello, " & item 1 of argv & "!"
      end run
    `,
    ['PenX'],
  )

  render(new MarkdownBuilder('# hello world. ' + res))
}

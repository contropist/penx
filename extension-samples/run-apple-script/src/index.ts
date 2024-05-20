import { renderMarkdown, runAppScript } from 'penx'

export async function main() {
  // const script = 'return "unicorn"'
  const script1 = 'display notification "Hello World" with title "Notification"'
  const res = await runAppScript(script1)
  renderMarkdown('# hello world. ' + res)
}

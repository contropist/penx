import { MarkdownBuilder, render, runAppleScript, fetch } from 'penx'

export async function main() {
  // const script = 'return "unicorn"'
  // const script1 = 'display notification "Hello World" with title "Notification"'
  // const res = await runAppleScript(script1)
  // const cbText = await clipboard.readText(undefined)
  // console.log('cbText: ', cbText)
  // const b64Img = await clipboard.readImageBase64()
  // console.log(b64Img)
  // const img = await clipboard.readImage({ format: 'int_array' })
  // console.log(img)
  // console.log(typeof img)
  // console.log(await clipboard.readFiles())
  // console.log(await clipboard.readHtml())
  // console.log(await clipboard.readText())
  // await clipboard.writeHtmlAndText({
  //   html: '<h1>hello world</h1>',
  //   text: 'hello huakun',
  // })
  // await clipboard.writeText('hello huakun')
  // await clipboard.writeHtml('<h1>hello world</h1>')

  fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    console.log(response)
  })
  // .then((response) => response.json())
  // .then((json) => console.log(json))

  const res = await runAppleScript({
    script: `
      on run argv
        return "hello, " & item 1 of argv & "!"
      end run
    `,
    argsOrOptions: ['PenX'],
  })

  render(new MarkdownBuilder('# hello world. ' + res))
}

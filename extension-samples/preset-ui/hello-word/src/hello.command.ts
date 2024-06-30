import { MarkdownApp } from '@penxio/preset-ui'
import { notification, fetch } from '@penxio/api'

export async function main() {
  notification.sendNotification('Hello world')
  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))
  new MarkdownApp({ content: '# Hello world' }).run()
}

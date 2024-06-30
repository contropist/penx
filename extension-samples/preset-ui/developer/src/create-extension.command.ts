import { FormApp } from '@penxio/preset-ui'
import { fs } from '@penxio/api'

export function main() {
  const app = new FormApp({
    fields: [
      {
        label: 'Template',
        name: 'template',
        component: 'Select',
        options: [
          { label: 'Markdown App', value: 'markdown' },
          { label: 'List App', value: 'list' },
          { label: 'Form App', value: 'form' },
        ],
        value: 'list',
      },

      {
        label: 'Extension Name',
        name: 'extensionName',
        component: 'Input',
        value: '',
      },
      {
        label: 'Extension Title',
        name: 'extensionTitle',
        component: 'Input',
        value: '',
      },
      {
        label: 'Location',
        name: 'location',
        component: 'Input',
      },

      {
        label: 'Location',
        name: 'location',
        component: 'Input',
      },

      {
        label: 'Command Title',
        name: 'commandTitle',
        component: 'Input',
      },

      {
        label: 'Command Description',
        name: 'commandDescription',
        component: 'Textarea',
      },
    ],
    actions: [
      {
        type: 'SubmitForm',
        onSubmit: async (values) => {
          console.log('1======values:', values)
          try {
            await fs.writeTextFile(
              '/Users/ziyi/repos/web3/penx/hello.md',
              'Hello from PenX!',
            )
            console.log('file created!')
          } catch (error) {
            console.log('error:', error)
          }
        },
      },
    ],
  }).run()
}

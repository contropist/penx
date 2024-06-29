import { FormApp } from '@penxio/preset-ui'

export function main() {
  const app = new FormApp({
    fields: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: 'Jack',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
      },
    ],
    actions: [
      {
        type: 'SubmitForm',
        onSubmit: async (values) => {
          console.log('======values:', values)
        },
      },
    ],
  }).run()
}

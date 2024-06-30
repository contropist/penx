import { memo, useEffect } from 'react'
import { Box } from '@fower/react'
import { FormJSON } from '@penxio/preset-ui'
import { Form, useForm } from 'fomir'
import { appEmitter } from '@penx/event'
import { workerStore } from '~/common/workerStore'

interface FormAppProps {
  component: FormJSON
}

export const FormApp = memo(function FormApp({ component }: FormAppProps) {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    children: [
      ...component.fields,
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Checkbox',
        value: '',
        validators: {
          required: 'First Name is requiredFirst Name is required',
        },
      },
      // {
      //   label: 'Last Name',
      //   name: 'lastName',
      //   component: 'Input',
      //   value: '',
      //   validators: {
      //     required: 'First Name is required',
      //   },
      // },
    ],
  })

  useEffect(() => {
    function onSubmit(index: number) {
      console.log('nam.........')

      workerStore.currentWorker!.postMessage({
        type: 'action--on-submit',
        values: form.getValues(),
        actionIndex: index,
      })
    }
    appEmitter.on('SUBMIT_FORM_APP', onSubmit)
    return () => {
      appEmitter.off('SUBMIT_FORM_APP', onSubmit)
    }
  }, [form])

  return (
    <Box py4>
      <Form form={form} />
    </Box>
  )
})

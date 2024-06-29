import { memo, useEffect } from 'react'
import { Box } from '@fower/react'
import { FormJSON } from '@penxio/preset-ui'
import { Form, useForm } from 'fomir'
import { appEmitter } from '@penx/event'

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
      // {
      //   label: 'First Name',
      //   name: 'firstName',
      //   component: 'Input',
      //   value: '',
      //   validators: {
      //     required: 'First Name is requiredFirst Name is required',
      //   },
      // },
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
    function onSubmit() {
      console.log('===values:', form.getValues())
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

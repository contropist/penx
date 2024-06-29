import { NodeProps, useFormContext } from 'fomir'
import { Button } from 'uikit'
import { FormField } from '../FormField'

export const Reset = ({ node }: NodeProps<any>) => {
  const { text, componentProps } = node
  const form = useFormContext()
  return (
    <FormField node={node}>
      <Button type="submit" {...componentProps} onClick={() => form.resetForm()}>
        {text}
      </Button>
    </FormField>
  )
}

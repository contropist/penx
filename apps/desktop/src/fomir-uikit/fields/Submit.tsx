import { NodeProps } from 'fomir'
import { SubmitNode } from '../fomir-uikit-node'
import { Button } from 'uikit'
import { FormField } from '../FormField'

export const Submit = ({ node }: NodeProps<SubmitNode>) => {
  const { text, componentProps } = node
  return (
    <FormField node={node}>
      <Button type="submit" w={['100%', '100%']} {...componentProps}>
        {text}
      </Button>
    </FormField>
  )
}

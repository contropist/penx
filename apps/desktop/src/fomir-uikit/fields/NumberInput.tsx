import { FC } from 'react'
import { NodeProps } from 'fomir'
import { NumberInputNode } from '../fomir-uikit-node'
import { Input as BoneInput } from 'uikit'
import { FormField } from '../FormField'

export const NumberInput: FC<NodeProps<NumberInputNode>> = (props) => {
  const { value, disabled, componentProps } = props.node
  return (
    <FormField node={props.node}>
      <BoneInput
        disabled={disabled}
        type={'text'}
        value={value || ''}
        onChange={props.handler.handleChange}
        {...componentProps}
      />
    </FormField>
  )
}

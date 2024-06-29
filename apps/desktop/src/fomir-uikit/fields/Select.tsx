import { FC } from 'react'
import { NodeProps } from 'fomir'
import { SelectNode } from '../fomir-uikit-node'
import { Select as BoneSelect } from 'uikit'
import { FormField } from '../FormField'

export const Select: FC<NodeProps<SelectNode>> = (props) => {
  const { value, componentProps, options = [], display, wrapper } = props.node

  return (
    <FormField node={props.node} hidden={!display}>
      <BoneSelect {...componentProps} value={value} onChange={props.handler.handleChange} />
    </FormField>
  )
}

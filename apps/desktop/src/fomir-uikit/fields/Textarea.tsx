import React, { FC } from 'react'
import { NodeProps } from 'fomir'
import { TextareaNode } from '../fomir-uikit-node'
import { Textarea as BoneTextarea } from 'uikit'
import { FormField } from '../FormField'

export const Textarea: FC<NodeProps<TextareaNode>> = (props) => {
  const { value, componentProps } = props.node

  return (
    <FormField node={props.node}>
      <BoneTextarea
        placeholder={componentProps.placeholder}
        value={value}
        onChange={props.handler.handleChange}
      />
    </FormField>
  )
}

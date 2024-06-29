import React, { FC } from 'react'
import { NodeProps } from 'fomir'
import { CheckboxNode } from '../fomir-uikit-node'
import { Checkbox as BoneCheckbox } from 'uikit'
import { FormField } from '../FormField'

export const Checkbox: FC<NodeProps<CheckboxNode>> = (props) => {
  const { value } = props.node

  function handleChange(e: any) {
    props.handler.handleChange(e.target.checked)
  }

  return (
    <FormField node={props.node}>
      <BoneCheckbox checked={value} onChange={handleChange} />
    </FormField>
  )
}

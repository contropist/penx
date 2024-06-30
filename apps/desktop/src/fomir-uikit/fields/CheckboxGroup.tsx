import React, { FC } from 'react'
import { NodeProps } from 'fomir'
import { CheckboxGroupNode } from '../fomir-uikit-node'
import { CheckboxGroup as BoneCheckboxGroup, Checkbox } from 'uikit'
import { FormField } from '../FormField'

export const CheckboxGroup: FC<NodeProps<CheckboxGroupNode>> = (props) => {
  const { value, options = [] } = props.node

  return (
    <FormField node={props.node}>
      <BoneCheckboxGroup value={value} onChange={props.handler.handleChange}>
        {options.map((item: any) => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </BoneCheckboxGroup>
    </FormField>
  )
}

import React, { FC, useState } from 'react'
import { Box } from '@fower/react'
import { NodeProps } from 'fomir'
import { Eye, EyeOff } from 'lucide-react'
import { InputNode } from '../fomir-uikit-node'
import { Input as BoneInput, InputElement, InputGroup } from 'uikit'
import { FormField } from '../FormField'

export const PasswordInput: FC<NodeProps<InputNode>> = (props) => {
  const { value, disabled, componentProps } = props.node
  const [type, setType] = useState<'password' | 'text'>('password')

  return (
    <FormField node={props.node}>
      <InputGroup w-100p>
        <BoneInput
          disabled={disabled}
          type={type}
          value={value || ''}
          onChange={props.handler.handleChange}
          {...componentProps}
        />
        <InputElement toCenterY gap2>
          {type === 'password' && (
            <Box inlineFlex cursorPointer gray400 gray500--hover>
              <EyeOff size={20} onClick={() => setType('text')} />
            </Box>
          )}

          {type === 'text' && (
            <Box inlineFlex cursorPointer gray400 gray500--hover>
              <Eye size={20} onClick={() => setType('password')} />
            </Box>
          )}
        </InputElement>
      </InputGroup>
    </FormField>
  )
}

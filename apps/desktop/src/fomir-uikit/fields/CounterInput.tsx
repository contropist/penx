import { FC } from 'react'
import { NodeProps } from 'fomir'
import { Minus, Plus } from 'lucide-react'
import { CounterInputNode } from '../fomir-uikit-node'
import { Input as BoneInput, InputElement, InputGroup } from 'uikit'
import { FormField } from '../FormField'

export const CounterInput: FC<NodeProps<CounterInputNode>> = (props) => {
  const { value, disabled, componentProps } = props.node

  return (
    <FormField node={props.node}>
      <InputGroup>
        <InputElement
          cursorPointer
          cursorNotAllowed={componentProps?.min === Number(value)}
          onClick={() => {
            if (componentProps?.min === Number(value)) return
            props.handler.handleChange(Number(value) - 1)
          }}
        >
          <Minus />
        </InputElement>

        <BoneInput
          textCenter
          disabled={disabled}
          type={'text'}
          value={value || ''}
          onChange={props.handler.handleChange}
          {...componentProps}
        />

        <InputElement cursorPointer onClick={() => props.handler.handleChange(Number(value) + 1)}>
          <Plus />
        </InputElement>
      </InputGroup>
    </FormField>
  )
}

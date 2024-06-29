import React, { FC, forwardRef, ReactNode } from 'react'
import type { SVGProps } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'
import { Node, useFormContext } from 'fomir'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from 'uikit'

export interface FormFieldProps extends FowerHTMLProps<'div'> {
  showLabel?: boolean
  node: Node
  renderLabel?: () => ReactNode
}

export const FormField: FC<FormFieldProps> = forwardRef(function FormFieldComp(
  props: FormFieldProps,
  ref,
) {
  const { children, node, showLabel = true, renderLabel, ...rest } = props
  const { schema } = useFormContext()
  const { layout = 'horizontal' } = schema
  const { error, label, description, touched, wrapper } = node || {}

  if (!wrapper) return <>{children}</>
  return (
    <Box
      className="uikit-form-field"
      ref={ref as any}
      relative
      flex
      mb6
      hidden={!node.display}
      // w-100p
      toCenterY
      column={layout === 'vertical'}
      {...rest}
      gap2
    >
      <Box toCenterY w-190 toRight text-13>
        {renderLabel?.()}
        {showLabel && label && (
          <Box
            toCenterY
            gap1
            mb2={layout === 'vertical'}
            toRight={layout === 'horizontal'}
            pr2={layout !== 'vertical'}
            w-100={layout === 'horizontal'}
          >
            {label && (
              <Box as="label" className="uikit-form-field-label" leading-1em toCenterY>
                {label}
              </Box>
            )}

            {description && (
              <Tooltip>
                <TooltipTrigger>
                  <Info size={20} />
                </TooltipTrigger>
                <TooltipContent>{description}</TooltipContent>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      <Box toCenterY flex-1>
        {children}
      </Box>

      <Box w-190 toCenterY>
        {error && touched && (
          <Box h-1em red400 left0 text="0.9em">
            {error}
          </Box>
        )}
      </Box>
    </Box>
  )
})

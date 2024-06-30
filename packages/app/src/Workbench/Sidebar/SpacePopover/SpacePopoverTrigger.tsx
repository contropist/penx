import { forwardRef } from 'react'
import { Box } from '@fower/react'
import { ChevronsUpDown } from 'lucide-react'
import { Bullet, PopoverTrigger } from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { SettingsButton } from '../SettingsButton'

export const SpacePopoverTrigger = forwardRef<HTMLDivElement, {}>(
  function SpacePopoverTrigger({}, ref) {
    const { activeSpace } = useActiveSpace()

    if (!activeSpace) return null

    return (
      <PopoverTrigger asChild>
        <Box
          ref={ref}
          className="currentSpace"
          textBase
          toCenterY
          fontSemibold
          toBetween
          gap1
          bgZinc200--hover
          px2
          cursorPointer
          roundedLG
          h-36
          transitionColors
          black
          flex-1
        >
          <Box toCenterY gap1>
            <Bullet
              size={20}
              innerSize={6}
              innerColor={activeSpace?.color}
              mr1
            />
            <Box flex-1 maxW-180>
              <Box
                overflowHidden
                css={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeSpace?.name}
              </Box>
            </Box>
            <Box gray400 flexShrink-0>
              <ChevronsUpDown
                size={12}
                style={{
                  strokeWidth: 2.5,
                }}
              />
            </Box>
          </Box>
          <SettingsButton />
        </Box>
      </PopoverTrigger>
    )
  },
)

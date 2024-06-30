import { Box } from '@fower/react'
import { DoorOpenIcon, EyeOffIcon, Star } from 'lucide-react'
import { MenuItem } from './MenuItem'

interface Props {
  onSelect?: () => void
}

export const RootActions = ({ onSelect }: Props) => {
  return (
    <>
      <MenuItem
        shortcut="↵"
        onSelect={() => {
          onSelect?.()
        }}
      >
        <Box toCenterY gap2 inlineFlex>
          <Box gray800>
            <DoorOpenIcon size={16} />
          </Box>
          <Box>Open Command</Box>
        </Box>
      </MenuItem>
      {/* <MenuItem shortcut="⌘ ↵">Show in Finder</MenuItem> */}
      <MenuItem shortcut="⌘ ⇧ F">
        <Box toCenterY gap2 inlineFlex>
          <Box gray800>
            <Star size={16} />
          </Box>
          <Box>Add to Favorites</Box>
        </Box>
      </MenuItem>

      <MenuItem shortcut="">
        <Box toCenterY gap2>
          <Box gray800 inlineFlex>
            <EyeOffIcon size={16} />
          </Box>
          <Box>Disable Command</Box>
        </Box>
      </MenuItem>
    </>
  )
}

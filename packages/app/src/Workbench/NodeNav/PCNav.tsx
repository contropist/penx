import { Box } from '@fower/react'
import { WORKBENCH_NAV_HEIGHT } from '@penx/constants'
import { useRouterName } from '@penx/hooks'
import { useNodeContext } from '@penx/node-hooks'
import { PaletteDrawer } from '../PaletteDrawer'
import { Breadcrumb } from './Breadcrumb'
import { ClosePanelButton } from './ClosePanelButton'
import { FavoriteButton } from './FavoriteButton'
import { MorePopover } from './MorePopover'
import { PublishPopover } from './PublishPopover'

export const PCNav = () => {
  const { node } = useNodeContext()
  const name = useRouterName()

  // if (!node) return null
  return (
    <Box
      data-tauri-drag-region
      h={WORKBENCH_NAV_HEIGHT}
      sticky
      top0
      toCenterY
      toBetween
      borderBottom
      // pr2
      display={['none', 'none', 'inline-flex']}
      w-100p
      bgWhite
      zIndex-10
    >
      <Box pl12>
        {node && <Breadcrumb />}
        {name === 'DATABASES' && <Box>Databases</Box>}
        {name === 'EXTENSIONS' && <Box>Extensions</Box>}
        {name === 'ACCOUNT_SETTINGS' && <Box>Account settings</Box>}
        {name === 'RECOVER_PHRASE' && <Box>Recover phrase</Box>}
        {name === 'LOCAL_BACKUP' && <Box>Local auto backup</Box>}
      </Box>

      <Box pr2>
        {node && <FavoriteButton />}
        {/* <PublishPopover /> */}
        {/* <ClosePanelButton /> */}
        {/* <MorePopover /> */}
      </Box>
    </Box>
  )
}

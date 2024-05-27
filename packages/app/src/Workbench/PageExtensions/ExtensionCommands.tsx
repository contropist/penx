import { Box } from '@fower/react'
import { Checkbox } from 'uikit'
import { IExtension } from '@penx/model-types'
import { BindingHotkey } from './BindingHotkey'
import { ExtensionIcon } from './ExtensionIcon'
import { SetAlias } from './SetAlias'

interface Props {
  extension: IExtension
}

export function ExtensionCommands({ extension }: Props) {
  return (
    <Box column gap1 mt2>
      {extension.commands.map((command) => {
        const { assets = {} } = extension
        const extensionIcon = assets[extension.icon as string]
        const commandIcon = assets[command.icon as string]
        const icon = commandIcon || extensionIcon
        return (
          <Box key={command.name} toCenterY>
            <Box flex-2 toCenterY gap1 pl-6>
              <Box circle-6 bgNeutral400 mr-8 />
              <ExtensionIcon icon={icon} />
              <Box textSM>{command.title}</Box>
            </Box>
            <Box flex-1>
              <SetAlias extension={extension} command={command} />
            </Box>
            <Box flex-1>
              <BindingHotkey />
            </Box>

            <Box w-80 toRight>
              <Checkbox defaultChecked={false} />
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Input } from 'uikit'
import { db } from '@penx/local-db'
import { Command } from '@penx/model'
import { IExtension } from '@penx/model-types'

interface Props {
  command: Command
  extension?: IExtension
}

export const SetAlias = memo(
  function SetAlias({ command, extension }: Props) {
    return (
      <Input
        size={28}
        textXS
        placeholder="Set Alias"
        maxW-100
        defaultValue={command.alias || ''}
        onChange={async (e) => {
          if (extension) {
            await db.updateCommandAlias(extension.id, command.name, e.target.value)
          }
        }}
      />
    )
  },
  (prev, next) => isEqual(prev.command, next.command),
)

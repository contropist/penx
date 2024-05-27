import { Input } from 'uikit'
import { db } from '@penx/local-db'
import { IExtension } from '@penx/model-types'

interface Props {
  command: IExtension['commands'][0]
  extension: IExtension
}

export const SetAlias = ({ command, extension }: Props) => {
  return (
    <Input
      size={28}
      textXS
      placeholder="Set Alias"
      maxW-100
      defaultValue={command.alias || ''}
      onChange={async (e) => {
        await db.updateCommandAlias(extension.id, command.name, e.target.value)
      }}
    />
  )
}

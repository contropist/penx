import { Input } from 'uikit'
import { db } from '@penx/local-db'
import { IDatabaseNode } from '@penx/model-types'

interface Props {
  database: IDatabaseNode
}

export const SetAlias = ({ database }: Props) => {
  return (
    <Input
      size="sm"
      placeholder="Set Alias"
      maxW-160
      defaultValue={database.props.commandAlias || ''}
      onChange={async (e) => {
        await db.updateDatabaseProps(database.id, {
          commandAlias: e.target.value,
        })
      }}
    />
  )
}

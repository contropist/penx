import { useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'
import { useCurrentDatabase } from '~/hooks/useCurrentDatabase'
import { useIsAddRow } from '~/hooks/useIsAddRow'
import { useSearch } from '~/hooks/useSearch'
import { StyledCommandGroup } from '../../CommandComponents'
import { AddRowForm } from './AddRowForm'
import { DatabaseDetail } from './DatabaseDetail'

export function DatabaseApp() {
  const { database } = useCurrentDatabase()
  const { search } = useSearch()
  const { isAddRow } = useIsAddRow()

  const { data, isLoading } = useQuery({
    queryKey: ['database', database.id],
    queryFn: () => db.getDatabase(database.id),
  })

  if (isLoading || !data) {
    return <StyledCommandGroup></StyledCommandGroup>
  }

  // if (isAddRow) return <AddRowForm {...data} />
  return <DatabaseDetail {...data} text={search} />
}

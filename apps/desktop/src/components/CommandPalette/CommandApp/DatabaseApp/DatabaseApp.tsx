import { useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'
import { useCurrentDatabase } from '~/hooks/useCurrentDatabase'
import { useSearch } from '~/hooks/useSearch'
import { StyledCommandGroup } from '../../CommandComponents'
import { DatabaseDetail } from './DatabaseDetail'

export function DatabaseApp() {
  const { database } = useCurrentDatabase()
  const { search } = useSearch()

  const { data, isLoading } = useQuery({
    queryKey: ['database', database.id],
    queryFn: () => db.getDatabase(database.id),
  })

  if (isLoading || !data) {
    return <StyledCommandGroup></StyledCommandGroup>
  }

  return <DatabaseDetail {...data} text={search} />
}

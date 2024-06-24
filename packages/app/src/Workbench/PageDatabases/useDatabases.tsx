import { useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'

export function useDatabases() {
  return useQuery({
    queryKey: ['databases'],
    queryFn: () => db.listDatabases(),
  })
}

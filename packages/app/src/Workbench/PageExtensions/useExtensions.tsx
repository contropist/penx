import { useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'

export function useExtensions() {
  return useQuery({
    queryKey: ['extensions'],
    queryFn: () => db.listExtensions(),
  })
}

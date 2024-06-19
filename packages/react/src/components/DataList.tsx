import { memo, PropsWithChildren } from 'react'

interface DataListProps {}
export const DataList = function DataListItem({
  children,
}: PropsWithChildren<DataListProps>) {
  return <div className="flex items-center ">{children}</div>
}

import { useEffect, useMemo } from 'react'
import { Box } from '@fower/react'
import { Divider } from 'uikit'
import { DatabaseProvider } from '@penx/database-context'
import {
  ICellNode,
  IColumnNode,
  IDatabaseNode,
  IOptionNode,
  IRowNode,
  IViewNode,
} from '@penx/model-types'
import { mappedByKey } from '@penx/shared'
import { ICommandItem } from '~/common/types'
import { useValue } from '~/hooks/useValue'
import { StyledCommandEmpty, StyledCommandGroup } from '../../CommandComponents'
import { ListItemUI } from '../../ListItemUI'
import { RowForm } from './RowForm'

interface Props {
  text: string
  database: IDatabaseNode
  views: IViewNode[]
  columns: IColumnNode[]
  rows: IRowNode[]
  cells: ICellNode[]
  options: IOptionNode[]
}

interface Item {
  row: IRowNode
  cell: ICellNode
  rowCells: ICellNode[]
}

export function DatabaseDetail(props: Props) {
  const { value, setValue } = useValue()
  const { text, ...rest } = props
  const { columns, rows, views, cells } = rest
  const currentView = views[0]
  const { viewColumns = [] } = currentView.props
  const columnMap = mappedByKey(columns, 'id')
  const sortedColumns = viewColumns.map(({ columnId }) => columnMap[columnId])

  const filteredRows: Item[] = useMemo(() => {
    const items = rows
      .map((row) => {
        const rowCells = cells.filter((cell) => cell.props.rowId === row.id)

        if (!text) {
          const cell = rowCells.find(
            (cell) => cell.props.columnId === sortedColumns[0].id,
          )!
          return { row, rowCells, cell }
        }

        const cell = rowCells.find((cell) => {
          // console.log('cell-----:', cell.props.data)
          const data = String(cell.props?.data || '').toLowerCase()
          return data.includes(text.toLowerCase())
        })!
        return { row, rowCells, cell }
      })
      .filter((item) => !!item.cell)
      .slice(0, 20)
    return items
  }, [rows, cells, text, sortedColumns])

  useEffect(() => {
    if (!isUuidV4(value) && filteredRows.length) {
      setValue(filteredRows[0].row.id)
    }
  }, [filteredRows, value, setValue])

  // console.log('=======filteredRows:', filteredRows, 'value:', value)
  const currentItem = filteredRows.find((item) => item.row.id === value)

  if (!filteredRows.length)
    return (
      <StyledCommandGroup block--i>
        <StyledCommandEmpty gray500>No results found.</StyledCommandEmpty>
      </StyledCommandGroup>
    )

  return (
    <Box toLeft overflowHidden absolute top0 bottom0 left0 right0>
      <StyledCommandGroup p2 flex-2 overflowYAuto>
        {filteredRows.map((item, index) => {
          // console.log('=======item:', item)

          const listItem = {
            title: dataToString(item.cell.props.data),
          } as ICommandItem
          return (
            <ListItemUI
              key={index}
              index={index}
              showIcon={false}
              value={item.row.id}
              item={listItem}
            />
          )
        })}
      </StyledCommandGroup>

      <Divider orientation="vertical" />

      <Box flex-3 overflowAuto p3>
        {currentItem && (
          <DatabaseProvider {...rest}>
            <RowForm {...rest} rowId={currentItem.row.id} />
          </DatabaseProvider>
        )}
      </Box>
    </Box>
  )
}

function dataToString(data: any) {
  if (!data) return 'Untitled'
  if (typeof data === 'string') return data
  if (typeof data === 'number') return data.toString()
  if (Array.isArray(data)) return data.join(',')
  return JSON.stringify(data, null)
}

function isUuidV4(uuid: string): boolean {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidV4Regex.test(uuid)
}

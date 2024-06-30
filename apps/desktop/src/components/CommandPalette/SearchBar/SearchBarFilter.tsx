import { useState } from 'react'
import { Box } from '@fower/react'
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'uikit'
import { appEmitter } from '@penx/event'
import { FilterItem } from '@penx/model-types'

interface Props {
  filters: Record<string, FilterItem[]>
}
export const SearchBarFilter = ({ filters }: Props) => {
  const initialValue = Object.keys(filters).reduce(
    (acc, key) => {
      const find = filters[key].find((item) => item.selected)
      return {
        ...acc,
        [key]: find?.value ?? undefined,
      }
    },
    {} as Record<string, any>,
  )

  const [filterValue, setFilterValue] = useState(initialValue)

  return (
    <Box mr2 toCenterY gap1>
      {Object.keys(filters).map((key) => {
        const items = filters[key]
        return (
          <FilterSelect
            key={key}
            value={filterValue[key]}
            items={items}
            onChange={(v) => {
              const newState = { ...filterValue, [key]: v }
              appEmitter.emit('ON_COMMAND_PALETTE_FILTER_CHANGE', newState)
              setFilterValue(newState)
            }}
          />
        )
      })}
    </Box>
  )
}

interface FilterSelectProps {
  value: string
  onChange: (v: string) => void
  items: FilterItem[]
}
function FilterSelect({ value, onChange, items }: FilterSelectProps) {
  return (
    <Select
      placement="bottom-end"
      value={value}
      onChange={(v: string) => onChange(v)}
    >
      <SelectTrigger flex-1 textSM bgZinc100 w-120>
        <SelectValue flexShrink-0 placeholder=""></SelectValue>
        <SelectIcon></SelectIcon>
      </SelectTrigger>
      <SelectContent w-200 maxH-240 useTriggerWidth={false} overflowAuto>
        {items.map((item) => (
          <SelectItem
            key={item.value + item.value.toString()}
            value={item.value}
            toBetween
          >
            <Box flex-1>{item.label}</Box>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

import { useState } from 'react'
import { Box } from '@fower/react'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { db, formatTagName } from '@penx/local-db'
import { Node } from '@penx/model'
import { IDatabaseNode } from '@penx/model-types'
import { store } from '@penx/store'
import { useDatabases } from './useDatabases'

export function AddDatabase() {
  const [value, setValue] = useState('')
  const { refetch } = useDatabases()
  const { activeSpace } = useActiveSpace()
  const { mutateAsync, isLoading } = useMutation(
    ['createDatabase', activeSpace?.id],
    (name: string) => store.node.createDatabase(activeSpace.id, name),
  )

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box
          bgNeutral100
          bgNeutral200--hover
          cursorPointer
          h-120
          w-200
          rounded2XL
          toCenter
          gray400
          borderDashed
          border
          column
        >
          <Plus size={40} strokeWidth="1.5"></Plus>
          <Box>Create database</Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent w-280 p3 column gap2>
        {({ close }) => (
          <>
            <Input
              placeholder="Database name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              disabled={!value || isLoading}
              onClick={async () => {
                if (!value) return
                await mutateAsync(formatTagName(value))
                await refetch()
                close()
              }}
            >
              Create
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

import { useState } from 'react'
import { Box } from '@fower/react'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { formatTagName } from '@penx/local-db'
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
        <Button colorScheme="white" size="md" px2 pr4--i>
          <Plus size={18} />
          <Box>Create database</Box>
        </Button>
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

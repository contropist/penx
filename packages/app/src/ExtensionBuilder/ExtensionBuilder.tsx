import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import ky from 'ky'
import { Button, toast } from 'uikit'
import { Manifest } from '@penx/extension-typings'
import { useActiveSpace } from '@penx/hooks'
import { db } from '@penx/local-db'
import { trpc } from '@penx/trpc-client'

export function ExtensionBuilder() {
  const { activeSpace } = useActiveSpace()
  const [value, setValue] = useState<Manifest>()
  async function runSSE() {
    try {
      await ky('http://localhost:3000/extension').json()
      const eventSource = new EventSource('http://localhost:3000/extension-sse')

      eventSource.onmessage = async (event) => {
        const data = event.data
        const extension: Manifest = JSON.parse(data)
        setValue(extension)
      }

      eventSource.onerror = (error) => {
        console.error('SSE error:', error)
      }
    } catch (error) {}
  }

  useEffect(() => {
    runSSE()
  }, [])

  if (!value) return null

  return (
    <Box flex-1 p6 gap5 column>
      <Box flex-1 column gap3 toCenter>
        <Box column gap2 toCenter>
          <Box text2XL fontBold>
            {value.name}
          </Box>

          <Box textBase>{value.description}</Box>
          <Box textSM>v{value.version}</Box>
        </Box>
        <Box h-400 overflowAuto w-100p bgGray100 rounded>
          <Box as="pre" flex-1 w-100p p3 m0>
            {value.code}
          </Box>
        </Box>
      </Box>

      <Box toCenter gap3 sticky bottom0></Box>
    </Box>
  )
}

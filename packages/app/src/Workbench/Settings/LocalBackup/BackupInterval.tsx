import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { get, set } from 'idb-keyval'
import { Radio, RadioGroup, RadioIndicator } from 'uikit'
import { LOCAL_BACKUP_INTERVAL } from '@penx/constants'

export function BackupInterval() {
  const [interval, setInterval] = useState<string>('')
  useEffect(() => {
    get(LOCAL_BACKUP_INTERVAL).then((v) => {
      setInterval(v || '30m')
    })
  }, [])
  return (
    <Box relative column gap6>
      <Box>
        <Box heading2>Backup interval</Box>
        <Box mb1>
          <RadioGroup
            toCenterY
            w-100p
            gap6
            value={interval}
            onChange={(v: string) => {
              setInterval(v)
              set(LOCAL_BACKUP_INTERVAL, v)
            }}
          >
            <Radio value={'30m'}>
              <RadioIndicator />
              <Box>30 minutes</Box>
            </Radio>

            <Radio value={'1h'}>
              <RadioIndicator />
              <Box>1 hours</Box>
            </Radio>

            <Radio value={'4h'}>
              <RadioIndicator />
              <Box>4 hours</Box>
            </Radio>
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  )
}

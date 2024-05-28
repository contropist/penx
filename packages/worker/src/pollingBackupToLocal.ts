import { get } from 'idb-keyval'
import {
  GOOGLE_DRIVE_BACKUP_INTERVAL,
  isProd,
  LOCAL_BACKUP_INTERVAL,
  WorkerEvents,
} from '@penx/constants'
import { db } from '@penx/local-db'
import { sleep } from '@penx/shared'

const timeMap: Record<string, number> = {
  '10m': 10 * 60 * 1000,
  '30m': 30 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '4h': 4 * 60 * 60 * 1000,
}

export async function pollingBackupToLocal() {
  const interval = await get(LOCAL_BACKUP_INTERVAL)

  let pollingInterval = isProd ? 30 * 60 * 1000 : 2 * 10 * 1000

  if (timeMap[interval]) pollingInterval = timeMap[interval]

  console.log('=======pollingInterval:', pollingInterval, 'interval:', interval)

  while (true) {
    // const data = await getAuthorizedUser()

    await sync()

    await sleep(pollingInterval)
  }
}

async function sync() {
  console.log('pollingBackupToLocal...........')
  // console.log('con==============', con, 'isMobile:', isMobile)

  const spaces = await db.listSpaces()
  const space = spaces[0]
  const nodes = await db.listNodesBySpaceId(space.id)

  postMessage({
    type: WorkerEvents.START_LOCAL_BACKUP,
    nodes,
  })
}

import { exists, writeTextFile } from '@tauri-apps/plugin-fs'
import { get } from 'idb-keyval'
import { toast } from 'uikit'
import {
  LOCAL_AUTO_BACKUP_DIR,
  SyncStatus,
  WorkerEvents,
} from '@penx/constants'
import { db } from '@penx/local-db'
import { Node } from '@penx/model'
import { getActiveSpaceId } from '@penx/storage'
// import { spacesAtom, store, syncStatusAtom } from '@penx/store'
import { spacesAtom, store } from '@penx/store'

export function runWorker() {
  console.log('init web worker...')

  const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  })

  worker.onmessage = async (
    event: MessageEvent<number | { type: number; nodes: any }>,
  ) => {
    // console.log(`WebWorker Response => ${event.data}`)

    if (event.data === WorkerEvents.START_PUSH) {
      // store.set(syncStatusAtom, SyncStatus.PUSHING)
    }

    if (event.data === WorkerEvents.PUSH_SUCCEEDED) {
      // store.set(syncStatusAtom, SyncStatus.NORMAL)

      const spaces = await db.listSpaces()
      store.set(spacesAtom, spaces)
    }

    if (event.data === WorkerEvents.PUSH_FAILED) {
      // store.set(syncStatusAtom, SyncStatus.PUSH_FAILED)
      toast.error('Push failed')
    }

    if (event.data === WorkerEvents.START_PULL) {
      // store.set(syncStatusAtom, SyncStatus.PULLING)
    }

    if (event.data === WorkerEvents.PULL_SUCCEEDED) {
      console.log('=====PULL_SUCCEEDED....')

      const activeSpaceId = await getActiveSpaceId()
      const spaces = await db.listSpaces()
      const activeSpace = spaces.find((s) => s.id === activeSpaceId)

      if (!activeSpace) return

      const nodes = await db.listNodesBySpaceId(activeSpace.id)
      store.space.setSpaces(spaces)
      store.node.setNodes(nodes)
      const [activeNode] = store.node.getActiveNodes()
      const newActiveNode = nodes.find((n) => n.id === activeNode.id)

      if (newActiveNode && store.router.isNode()) {
        store.node.selectNode(newActiveNode)
      }
    }

    if (event.data === WorkerEvents.PULL_FAILED) {
      // store.set(syncStatusAtom, SyncStatus.PULL_FAILED)
      toast.error('Pull failed')
    }

    if (event.data === WorkerEvents.ADD_TEXT_SUCCEEDED) {
      const activeSpace = store.space.getActiveSpace()
      const nodes = await db.listNodesBySpaceId(activeSpace.id)
      const activeNode = store.node.getActiveNodes()[0]

      store.node.setNodes(nodes)

      if (new Node(activeNode).isTodayNode) {
        store.node.selectDailyNote()
      }
    }

    //   if (
    //     typeof event.data !== 'number' &&
    //     event.data.type === WorkerEvents.START_LOCAL_BACKUP
    //   ) {
    //     let path = await get(LOCAL_AUTO_BACKUP_DIR)

    //     try {
    //       const nodes = event.data.nodes || []
    //       const { resolve } = await import('@tauri-apps/api/path')
    //       const dir = await resolve(path)

    //       if (!(await exists(dir))) {
    // await createDir(dir, { recursive: true })
    //       }

    //       const filePath = await resolve(path + `/all-${Date.now()}.json`)
    //       await writeTextFile(filePath, JSON.stringify(nodes, null, 2))
    //     } catch (error) {
    //       console.log('error======:', error)
    //     }
    //   }
  }

  worker.postMessage(WorkerEvents.START_POLLING)
}

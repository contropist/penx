import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { appDataDir, homeDir, join } from '@tauri-apps/api/path'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { register, unregister } from '@tauri-apps/plugin-global-shortcut'
import { platform } from '@tauri-apps/plugin-os'
import { open } from '@tauri-apps/plugin-shell'
import { ToastContainer } from 'uikit'
import { appEmitter } from '@penx/event'
import { clearAuthorizedUser, setLocalSession } from '@penx/storage'
import { store, StoreProvider } from '@penx/store'
import { TrpcProvider } from '@penx/trpc-client'
import '@glideapps/glide-data-grid/dist/index.css'
import { Box } from '@fower/react'
import { listen } from '@tauri-apps/api/event'
import { watch } from '@tauri-apps/plugin-fs'
import { isProd, isServer } from '@penx/constants'
import { db } from '@penx/local-db'
import { setMnemonicToLocal } from '@penx/mnemonic'
import { ClientOnly } from '@penx/widget'
import { runWorker } from '@penx/worker'
import { loginToDesktop } from '~/common/loginToDesktop'
import { modeAtom } from '~/hooks/useMode'
import { focusSearchBarInput } from './common/focusSearchBarInput'
import { initFower } from './common/initFower'
import { positionAtom } from './hooks/useCommandPosition'
import { MainApp } from './MainApp'
import '~/styles/globals.css'
import '~/styles/command.scss'
import { useThemeMode } from '@penx/hooks'

initFower()

const isDev = import.meta.env.MODE === 'development'

async function listenForHotkey(shortcut: string) {
  const appWindow = getCurrent()

  await register(shortcut, async () => {
    if (document.hasFocus()) {
      // await appWindow.hide()
    } else {
      const appWindow = WebviewWindow.getByLabel('main')

      await appWindow?.show()
      // await appWindow?.center()
      await appWindow?.setFocus()
      setTimeout(() => {
        focusSearchBarInput()
      }, 0)
    }
  })
}

async function hideOnBlur() {
  const appWindow = getCurrent()
  const mainWindow = WebviewWindow.getByLabel('main')

  document.addEventListener('keydown', async (event) => {
    const mode = store.get(modeAtom)

    if (event.key === 'Escape') {
      if (mode === 'EDITOR') {
        await invoke('set_window_properties', {
          resizable: false,
          width: 750.0,
          height: 470.0,
          focus: true,
        })
        await appWindow?.center()
        store.set(modeAtom, 'COMMAND')
      } else {
        const position = store.get(positionAtom)
        if (position === 'ROOT') {
          mainWindow?.hide()
        } else {
          appEmitter.emit('ON_ESCAPE_IN_COMMAND')
        }
      }
    }
  })

  listen('tauri://blur', () => {
    if (!isDev) {
      const mode = store.get(modeAtom)
      if (mode === 'COMMAND') {
        appWindow.hide()
      }
    }
  })
}

async function init() {
  console.log('app init............')

  const platformName = await platform()
  console.log('=====platformName:', platformName)

  // if (platformName === 'macos') {
  //   // can also watch an array of paths
  //   const stopWatching = await watch(
  //     [
  //       await join(await homeDir(), 'Applications'),
  //       '/Applications',
  //       '/System/Applications',
  //       '/System/Applications/Utilities',
  //     ],
  //     (event) => {
  //       appEmitter.emit('ON_APPLICATION_DIR_CHANGE')
  //       invoke('convert_all_app_icons_to_png')
  //     },
  //     { recursive: true },
  //   )
  // }

  const shortcut = 'CommandOrControl+;'

  unregister(shortcut).then(() => {
    listenForHotkey(shortcut)
  })

  hideOnBlur()

  type Payload = {
    code: string
    commands: string
    assets: string
    name: string
    title: string
    icon: string
    version: string
  }

  const appWindow = getCurrent()
  console.log('=======appWindow.label:', appWindow.label)

  if (appWindow.label === 'main') {
    listen('UPSERT_EXTENSION', async (data) => {
      const payload = data.payload as Payload
      const commands = JSON.parse(payload.commands || '[]')
      const assets = JSON.parse(payload.assets || '{}')

      // console.log('======payload:', payload)

      await db.upsertExtension(payload.name, {
        isDeveloping: true,
        title: payload.title,
        commands,
        assets,
        icon: payload.icon,
        version: payload.version,
      })
    })
  }

  // listen('DESKTOP_LOGIN', async (data: any) => {
  //   const user = JSON.parse(data.payload?.user || '{}')
  //   const mnemonic = data.payload.mnemonic
  //   console.log('open window==========:', user, mnemonic)
  //   await loginToDesktop(mnemonic, user)
  //   appWindow.show()
  //   appWindow.setFocus()
  // })

  // appEmitter.on('SIGN_IN_DESKTOP', () => {
  //   open(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/desktop-login`)
  // })

  // document.addEventListener('keydown', function (event) {
  //   let keys = []

  //   console.log('event========:', event)

  //   if (event.ctrlKey) {
  //     keys.push('Control')
  //   }
  //   if (event.metaKey) {
  //     keys.push('Meta')
  //   }
  //   if (event.shiftKey) {
  //     keys.push('Shift')
  //   }
  //   if (event.altKey) {
  //     keys.push('Alt')
  //   }

  //   if (event.key.length === 1) {
  //     keys.push(event.key.toUpperCase())
  //   } else {
  //     keys.push(event.code)
  //   }

  //   const combination = keys.join('+')
  //   console.log('combination:', combination)
  // })

  // setTimeout(
  //   () => {
  //     runWorker()
  //   },
  //   isProd ? 5000 : 3000,
  // )
}

init()

function MyApp() {
  useEffect(() => {
    const handleSignOut = async () => {
      // const user = store.user.getUser()
      // await setMnemonicToLocal(user.id, '')
      // await clearAuthorizedUser()
      // await setLocalSession(null as any)
      // store.setToken(null as any)
      // store.user.setUser(null as any)
      // store.user.setMnemonic('')
      // appEmitter.emit('SIGN_OUT_SUCCESSFULLY')
    }

    appEmitter.on('SIGN_OUT', handleSignOut)
    return () => {
      appEmitter.off('SIGN_OUT', handleSignOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { initMode } = useThemeMode()
  useEffect(() => {
    initMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StoreProvider>
      <TrpcProvider>
        <ToastContainer position="bottom-right" />
        <MainApp />
        <div id="portal" />
      </TrpcProvider>
    </StoreProvider>
  )
}

export default MyApp

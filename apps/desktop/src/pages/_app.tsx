import '~/styles/globals.css'
import '~/styles/command.scss'
import { useEffect, useState } from 'react'
import { register, unregister } from '@tauri-apps/api/globalShortcut'
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/plugin-shell'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ToastContainer } from 'uikit'
import { initFower } from '@penx/app'
import { appEmitter } from '@penx/event'
import { clearAuthorizedUser, setLocalSession } from '@penx/storage'
import { store, StoreProvider } from '@penx/store'
import { TrpcProvider } from '@penx/trpc-client'
import '@glideapps/glide-data-grid/dist/index.css'
import { listen } from '@tauri-apps/api/event'
import { isProd, isServer } from '@penx/constants'
import { db } from '@penx/local-db'
import { setMnemonicToLocal } from '@penx/mnemonic'
import { ClientOnly } from '@penx/widget'
import { runWorker } from '@penx/worker'
import { loginToDesktop } from '~/common/loginToDesktop'
import { positionAtom } from '~/hooks/useCommandPosition'
import { modeAtom } from '~/hooks/useMode'
import { focusSearchBarInput } from '../common/focusSearchBarInput'

initFower()

const isDev = process.env.NODE_ENV === 'development'

async function listenForHotkey(shortcut: string) {
  const { appWindow, WebviewWindow } = await import('@tauri-apps/api/window')

  await register(shortcut, async () => {
    if (document.hasFocus()) {
      await appWindow.hide()
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
  const { appWindow, WebviewWindow } = await import('@tauri-apps/api/window')
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
    // console.log('blur...........')

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

  const { platform } = await import('@tauri-apps/api/os')
  const platformName = await platform()
  console.log('=====platformName:', platformName)

  if (platformName === 'darwin') {
    const { watch } = await import('tauri-plugin-fs-watch-api')
    const { appDataDir, homeDir, join } = await import('@tauri-apps/api/path')
    // can also watch an array of paths
    const stopWatching = await watch(
      [
        await join(await homeDir(), 'Applications'),
        '/Applications',
        '/System/Applications',
        '/System/Applications/Utilities',
      ],
      (event) => {
        appEmitter.emit('ON_APPLICATION_DIR_CHANGE')
        invoke('convert_all_app_icons_to_png')
      },
      { recursive: true },
    )
  }

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

  const { appWindow, WebviewWindow } = await import('@tauri-apps/api/window')

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

  listen('DESKTOP_LOGIN', async (data: any) => {
    const user = JSON.parse(data.payload?.user || '{}')
    const mnemonic = data.payload.mnemonic
    console.log('open window==========:', user, mnemonic)
    await loginToDesktop(mnemonic, user)
    appWindow.show()
    appWindow.setFocus()
  })

  listen('PreferencesClicked', (data) => {
    console.log('PreferencesClicked==========:', data.payload)
  })

  listen('MenuEditorClicked', (data) => {})

  appEmitter.on('SIGN_IN_DESKTOP', () => {
    open(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/desktop-login`)
  })

  document.addEventListener('keydown', function (event) {
    let keys = []

    console.log('event========:', event)

    if (event.ctrlKey) {
      keys.push('Control')
    }
    if (event.metaKey) {
      keys.push('Meta')
    }
    if (event.shiftKey) {
      keys.push('Shift')
    }
    if (event.altKey) {
      keys.push('Alt')
    }

    if (event.key.length === 1) {
      keys.push(event.key.toUpperCase())
    } else {
      keys.push(event.code)
    }

    const combination = keys.join('+')
    console.log('combination:', combination)
  })

  setTimeout(
    () => {
      runWorker()
    },
    isProd ? 5000 : 3000,
  )
}

if (!isServer) {
  init()
}

function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      const user = store.user.getUser()
      await setMnemonicToLocal(user.id, '')
      await clearAuthorizedUser()
      await setLocalSession(null as any)
      store.setToken(null as any)
      store.user.setUser(null as any)
      store.user.setMnemonic('')
      appEmitter.emit('SIGN_OUT_SUCCESSFULLY')
    }

    appEmitter.on('SIGN_OUT', handleSignOut)
    return () => {
      appEmitter.off('SIGN_OUT', handleSignOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then((result) => {
        setGreeting(result)
      })
      .catch(console.error)
  }, [])

  return (
    <ClientOnly>
      <StoreProvider>
        <TrpcProvider>
          <ToastContainer position="bottom-right" />
          <Component {...pageProps} />
          <div id="portal" />
        </TrpcProvider>
      </StoreProvider>
    </ClientOnly>
  )
}

export default MyApp

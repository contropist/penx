import { listen } from '@tauri-apps/api/event'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { db } from '@penx/local-db'

export async function watchDesktopLogin() {
  const appWindow = getCurrent()

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

  // setTimeout(
  //   () => {
  //     runWorker()
  //   },
  //   isProd ? 5000 : 3000,
  // )
}

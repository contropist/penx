import { isRegistered, register, unregister } from '@tauri-apps/plugin-global-shortcut'
import { ICommand, IExtension } from '@penx/model-types'

export async function registerCommandHotkey(
  extension: IExtension,
  command: ICommand,
  hotkey: string,
) {
  await unregister(hotkey)

  // console.log('11 extension', extension, command, hotkey)

  console.log('=====await isRegistered(hotkey):', await isRegistered(hotkey))

  if (await isRegistered(hotkey)) return

  try {
    console.log('=====hotkey:', hotkey)

    await register(hotkey, async (event) => {
      try {
        if (event.state === 'Pressed') {
          console.log('hello---------------:', event)
          // console.log('====extension', extension, command, hotkey)
        }
      } catch (error) {
        console.log('22222222---------xxx:', error)
      }
    })
  } catch (error) {
    console.log('11111111111:', error)
  }
}

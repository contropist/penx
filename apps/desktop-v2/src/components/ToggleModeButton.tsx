import { FowerHTMLProps } from '@fower/react'
import { invoke } from '@tauri-apps/api/core'
import { Button } from 'uikit'
import { IconSwap } from '@penx/icons'
import { useMode } from '~/hooks/useMode'

interface Props extends FowerHTMLProps<'button'> {}

export const ToggleModeButton = ({ ...rest }: Props) => {
  const { isEditor, setMode } = useMode()

  async function setWindow() {
    const { getCurrent } = await import('@tauri-apps/api/WebviewWindow')
    const appWindow = await getCurrent()
    // const appWindow = WebviewWindow.getByLabel('main')

    if (!appWindow) return

    if (isEditor) {
      setMode('COMMAND')

      await invoke('set_window_properties', {
        resizable: false,
        width: 750.0,
        height: 470.0,
        focus: true,
      })

      await appWindow.center()
    } else {
      setMode('EDITOR')

      await invoke('set_window_properties', {
        resizable: true,
        width: 1000.0,
        height: 800.0,
        focus: true,
      })

      await appWindow.center()
      setTimeout(() => {
        appWindow.setFocus()
      }, 0)
    }
  }
  return (
    <Button
      isSquare
      colorScheme="gray900"
      variant="ghost"
      size="sm"
      onClick={() => setWindow()}
      {...rest}
    >
      <IconSwap rotate={90} />
    </Button>
  )
}

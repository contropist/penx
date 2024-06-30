import { useQuery } from '@tanstack/react-query'
import { APP_HOTKEY, appDefaultHotkey } from '../constants'
import { getAppHotkey, saveAppHotkey } from '../utils'

export function useAppHotkey() {
  return useQuery({
    queryKey: [APP_HOTKEY],
    queryFn: async () => {
      const key = await getAppHotkey()
      if (!key) {
        await saveAppHotkey(appDefaultHotkey)
        return appDefaultHotkey
      }
      return key as string[]
    },
  })
}

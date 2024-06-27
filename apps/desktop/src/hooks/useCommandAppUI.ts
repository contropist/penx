import { IListItem } from '@penxio/preset-ui'
import { atom, useAtom } from 'jotai'

type MarketplaceUI = {
  type: 'marketplace'
}

type AboutUI = {
  type: 'about'
}

type InstalledExtensionsUI = {
  type: 'installed-extensions'
}

type SettingsUI = {
  type: 'settings'
}

type ClipboardHistoryUI = {
  type: 'clipboard-history'
}

type TodayUI = {
  type: 'today'
}

type DatabaseUI = {
  type: 'database'
}

type MarkdownUI = {
  type: 'markdown'
  content: string
}

type ListUI = {
  type: 'list'
  items: IListItem[]
}

type RenderUI = {
  type: 'render'
  component: any
}

export type CommandAppUI =
  | ListUI
  | MarkdownUI
  | MarketplaceUI
  | TodayUI
  | DatabaseUI
  | ClipboardHistoryUI
  | RenderUI
  | AboutUI
  | InstalledExtensionsUI
  | SettingsUI

export const commandUIAtom = atom<CommandAppUI>({} as CommandAppUI)

export function useCommandAppUI() {
  const [ui, setUI] = useAtom(commandUIAtom)

  return {
    ui,
    isList: ui.type === 'list',
    setUI,
  }
}

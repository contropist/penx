interface AccessoryObjectText {
  value: string | number
  color?: string
}

export type IconifyIconType = {
  name: string | number
  className?: string
}

export type IAccessory = {
  text?: (string | number) | AccessoryObjectText

  icon?: string
  tag?: {
    value: string | number
    bg?: string
  }
}

export function isAccessoryObjectText(obj: any): obj is AccessoryObjectText {
  return obj?.value !== undefined
}

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type OpenInBrowser = {
  type: 'OpenInBrowser'
  title?: string
  url: string
}

export function isOpenInBrowser(obj: any): obj is OpenInBrowser {
  return obj.type === 'OpenInBrowser'
}

export type CopyToClipboard = {
  type: 'CopyToClipboard'
  title?: string
  content: string
}

export function isCopyToClipboard(obj: any): obj is CopyToClipboard {
  return obj.type === 'CopyToClipboard'
}

export type CustomAction = {
  type: 'CustomAction'
  title?: string
  onClick: () => Promise<void>
}

export function isCustomAction(obj: any): obj is CustomAction {
  return obj.type === 'CustomAction'
}

export type ActionItem = OpenInBrowser | CopyToClipboard | CustomAction

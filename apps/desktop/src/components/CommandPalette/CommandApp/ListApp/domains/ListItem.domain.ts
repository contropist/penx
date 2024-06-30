import { IListItem, isTooltipValue } from '@penxio/preset-ui'

export class ListItem {
  constructor(
    public raw: IListItem,
    public index: number,
  ) {}

  get title() {
    if (isTooltipValue(this.raw.title)) {
      return this.raw.title.value
    }
    if (typeof this.raw.title === 'string') {
      return this.raw.title
    }
    return ''
  }

  get subtitle() {
    if (isTooltipValue(this.raw.subtitle)) {
      return this.raw.subtitle.value
    }
    if (typeof this.raw.subtitle === 'string') {
      return this.raw.subtitle
    }
    return ''
  }

  get value() {
    return this.index.toString()
  }

  get icon() {
    return this.raw.icon
  }

  get keywords() {
    return [this.title, this.subtitle]
  }

  get extra() {
    return this.raw.extra
  }
}

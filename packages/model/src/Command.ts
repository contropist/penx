import { ICommand, IDatabaseNode, IExtension } from '@penx/model-types'
import { Node } from './Node'

type IconifyIconType = {
  name: string
  className: string
}

function isIconify(icon: any): icon is IconifyIconType {
  return typeof icon === 'object' && icon.name
}

export class Command {
  commandRaw = {} as ICommand

  extension = {} as IExtension

  database = {} as IDatabaseNode

  private _source: 'extension' | 'application' | 'database'

  static formExtension(_extension: IExtension, _commandRaw: ICommand) {
    const c = new Command()
    c._source = _commandRaw.source === 'application' ? 'application' : 'extension'
    c.extension = _extension
    c.commandRaw = _commandRaw
    return c
  }

  static formDatabase(_database: IDatabaseNode) {
    const c = new Command()
    c._source = 'database'
    c.database = _database
    return c
  }

  get source() {
    return this._source
  }

  get typeName() {
    return this.source
  }

  get isDeveloping() {
    return this?.extension?.isDeveloping || false
  }

  get name() {
    return this.commandRaw.name || ''
  }

  get title() {
    return this.commandRaw?.title || ''
  }

  get subtitle() {
    return this.extension.title
  }

  get mode(): 'preset-ui' | 'custom-ui' | 'no-view' {
    return this.commandRaw?.mode as any
  }

  // from extension, common command
  get isCommand() {
    return this.source === 'extension'
  }

  get isDatabase() {
    return this.source === 'database'
  }

  get isApplication() {
    return this.source === 'application'
  }

  get alias() {
    return this?.commandRaw?.alias || ''
  }

  get hotkey() {
    return this?.commandRaw?.hotkey
  }

  get applicationPath() {
    return this.name || ''
  }

  get filters() {
    return this.commandRaw.filters
  }

  get code() {
    return this.commandRaw?.code || ''
  }

  get icon() {
    const command = this.commandRaw
    if (this.isCommand) {
      if (!command.icon) {
        return this.extension.icon
      }

      if (isIconify(command.icon)) return command.icon

      if (typeof command.icon === 'string') {
        if (command.icon?.startsWith('/')) return command.icon
        const commandIcon = this.extension.assets?.[command.icon]
        return commandIcon
      }
      return ''
    }

    if (this.isDatabase) {
      const node = new Node(this.database)
      return {
        value: '#',
        bg: node.tagColor,
      }
    }

    if (this.isApplication) {
      return this.commandRaw.icon || ''
    }

    return ''
  }

  get value() {
    if (this.isCommand) {
      return `${this.extension.name}__${this.name}`
    }

    if (this.isDatabase) {
      return this.database.id
    }

    if (this.isApplication) {
      return this.applicationPath
    }

    return ''
  }

  get keywords() {
    const k = [this.title, this.subtitle]
    if (this.alias) k.push(this.alias)
    return k
  }
}

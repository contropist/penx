import { ICommand, IDatabaseNode, IExtension } from '@penx/model-types'
import { Node } from './Node'

type AppInfo = {
  name: string
  icon_path: string | null
  app_path_exe: string | null
  app_desktop_path: string
}

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

  appInfo = {} as AppInfo

  private _type: 'command' | 'application' | 'database'

  static formExtension(_extension: IExtension, _commandRaw: ICommand) {
    const c = new Command()
    c._type = 'command'
    c.extension = _extension
    c.commandRaw = _commandRaw
    return c
  }

  static formDatabase(_database: IDatabaseNode) {
    const c = new Command()
    c._type = 'database'
    c.database = _database
    return c
  }

  static formApp(_appInfo: AppInfo) {
    const c = new Command()
    c._type = 'application'
    c.appInfo = _appInfo
    return c
  }

  get type() {
    return this._type
  }

  get typeName() {
    return this.type
  }

  get isDeveloping() {
    return this?.extension?.isDeveloping || false
  }

  get name() {
    return this.commandRaw.name || ''
  }

  get title() {
    return this.commandRaw?.title || this.appInfo?.name || ''
  }

  get subtitle() {
    return this.extension.title
  }

  get mode(): 'preset-ui' | 'custom-ui' | 'no-view' {
    return this.commandRaw?.mode as any
  }

  get isCommand() {
    return this.type === 'command'
  }

  get isDatabase() {
    return this.type === 'database'
  }

  get isApplication() {
    return this.type === 'application'
  }

  get alias() {
    return this?.commandRaw?.alias || ''
  }

  get applicationPath() {
    return this.appInfo.app_desktop_path || ''
  }

  // TODO:
  get extra(): any[] | null {
    return null as any
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
      return this.appInfo?.icon_path || ''
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

  get toCmdKItem() {
    //
    const command = this.commandRaw
    const extension = this.extension
    return {
      type: 'list-item',
      title: this.title,
      subtitle: this.subtitle,
      icon: this.icon,
      keywords: [],
      data: {
        type: 'Command',
        alias: command.alias,
        assets: extension.assets,
        filters: command.filters,
        mode: command.mode,
        commandName: command.name,
        extensionSlug: extension.name,
        extensionIcon: extension.assets?.[extension.icon as string],
        isDeveloping: extension.isDeveloping,
      },
    }

    // if (this.database) {
    //   return {
    //     type: 'list-item',
    //     title: node.tagName,
    //     subtitle: '',
    //     icon: {
    //       value: '#',
    //       bg: node.tagColor,
    //     },
    //     keywords: [],
    //     data: {
    //       alias: item.props.commandAlias,
    //       type: 'Database',
    //       database: item,
    //     } as ICommandItem['data'],
    //   }
    // }

    // type: 'list-item',
    // title: appInfo.name,
    // subtitle: '',
    // icon: appInfo.icon_path,
    // keywords: [],
    // data: {
    //   type: 'Application',
    //   applicationPath: appInfo.app_desktop_path,
    //   isApplication: true,
    // } as ICommandItem['data'],
  }
}

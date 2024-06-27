import isEqual from 'react-fast-compare'
import { db } from '@penx/local-db'
import { Command } from '@penx/model-types'
import { uniqueId } from '@penx/unique-id'

const name = '$penx_builtin_extension'

const commands: Command[] = [
  {
    name: 'marketplace',
    title: 'marketplace',
    icon: '/icons/marketplace.svg',
    subtitle: '',
    description: '',
    code: '',
    isBuiltIn: true,
  },
  {
    name: 'installed-extensions',
    title: 'Installed Extensions',
    icon: {
      name: 'lucide--layout-grid',
      className: 'bg-gradient-to-r from-green-500 to-cyan-500',
    },
    subtitle: '',
    description: '',
    code: '',
    isBuiltIn: true,
  },
  {
    name: 'about',
    title: 'About PenX',
    icon: {
      name: 'lucide--info',
      className: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
    },
    subtitle: '',
    description: '',
    code: '',
    isBuiltIn: true,
  },

  {
    name: 'settings',
    title: 'PenX Settings',
    icon: {
      name: 'lucide--settings',
      className: 'bg-gradient-to-r from-sky-500 to-indigo-500',
    },
    subtitle: '',
    description: '',
    code: '',
    isBuiltIn: true,
  },

  // {
  //   name: 'create-database',
  //   title: 'Create Database',
  //   icon: '/icons/docs.svg',
  //   subtitle: '',
  //   description: '',
  //   code: '',
  //   isBuiltIn: true,
  // },
  // {
  //   name: 'clipboard-history',
  //   title: 'Clipboard History',
  //   icon: '/icons/copy.svg',
  //   subtitle: '',
  //   description: '',
  //   code: '',
  //   isBuiltIn: true,
  // },
]

export async function installBuiltinExtension() {
  let ext = (await db.getExtensionByName(name))!

  if (ext) {
    for (const item of commands) {
      const find = ext.commands.find((c) => c.name === item.name)
      if (find) continue
      await db.addCommand(ext.id, item)
    }
    return
  }

  await db.createExtension({
    id: uniqueId(),
    spaceId: '',
    name,
    title: 'PenX',
    version: '0.0.0',
    assets: {},
    isDeveloping: false,
    icon: '/logo/128x128.png',
    commands,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

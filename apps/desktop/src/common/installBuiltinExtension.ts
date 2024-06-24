import { db } from '@penx/local-db'
import { uniqueId } from '@penx/unique-id'

const name = '$penx_builtin_extension'

export async function installBuiltinExtension() {
  let ext = (await db.getExtensionByName(name))!

  if (ext) return

  await db.createExtension({
    id: uniqueId(),
    spaceId: '',
    name,
    title: 'PenX',
    version: '0.0.0',
    assets: {},
    isDeveloping: false,
    icon: '/logo/128x128.png',
    commands: [
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
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

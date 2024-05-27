import { db } from '@penx/local-db'
import { uniqueId } from '@penx/unique-id'

const slug = '$penx_builtin_extension'

export async function installBuiltinExtension() {
  let ext = (await db.getExtensionBySlug(slug))!

  if (ext) return

  await db.createExtension({
    id: uniqueId(),
    spaceId: '',
    slug,
    name: 'PenX',
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
        name: 'clipboard-history',
        title: 'Clipboard history',
        icon: '/icons/copy.svg',
        subtitle: '',
        description: '',
        code: '',
        isBuiltIn: true,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { Logo } from './components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo></Logo>,
  project: {
    link: 'https://github.com/penxio/penx',
  },
  components: {
    na: () => <div>Helo</div>,
  },
  chat: {
    link: 'https://discord.gg/nyVpH9njDu',
  },
  docsRepositoryBase: 'https://github.com/penxio/penx',
  sidebar: {
    autoCollapse: false,
  },
  footer: (() => null) as any,
}

export default config

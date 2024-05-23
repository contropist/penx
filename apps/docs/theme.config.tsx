import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { Logo } from './components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo></Logo>,
  project: {
    link: 'https://github.com/penxio/penx',
  },
  chat: {
    link: 'https://discord.gg/nyVpH9njDu',
  },
  docsRepositoryBase: 'https://github.com/penxio/penx',
  sidebar: {
    autoCollapse: false,
  },
  footer: {
    text: 'PenX Docs',
  },
}

export default config

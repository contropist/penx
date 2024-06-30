<div align="center">

<a href="https://www.penx.io" alt="PenX Logo">
    <img src="https://www.penx.io/images/logo-512.png" height="120"/></a>

<h1 style="border-bottom: none">
    <b>PenX</b><br />
    A cross-platform productivity App
    <br>
</h1>

[Discord](https://discord.gg/nyVpH9njDu) | [Website](https://www.penx.io/) | [Issues](https://github.com/penxio/penx/issues)

</div>

## Introduction

PenX is a cross-platform productivity App built on open-source and Web3.

## Features

- **Local-First** - You own your data, in spite of the cloud
- **Privacy-First** - Use End-To-End Encryption to sync data
- **Open Source** - Trust our code, not our words

## Primary tech stack

- Tauri
- Next.js
- TypeScript
- tRPC
- Prisma
- NextAuth.js
- Slate.js
- IndexedDB

## Development

After clone the repo, in the root dir:

```bash
# Install the dependencies
pnpm install

pnpm run build:packages

cd apps/desktop

pnpm dev
```

Go to: http://localhost:3000

## Mac OS installation issue

If hit [“PenX.app” is damaged and can’t be opened. You should move it to the Trash.]

To fix it:

```bash
xattr -cr /Applications/PenX.app
```

## ⚖️ License

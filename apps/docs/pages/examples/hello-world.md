# Hello World Example

## Introduction

This document provides a step-by-step guide to creating a simple "Hello World" example.

## Project Structure

The project consists of the following key files:

- `manifest.json`: Contains metadata about the project.
- `hello.command.ts`: The main TypeScript file that renders the "Hello World" message.

## `manifest.json`

The manifest.json file contains metadata about the project, we create a command call **Hello world**.

```json
{
  "name": "hello-world",
  "title": "Hello world",
  "description": "This is a hello wold demo.",
  "icon": {
    "name": "mdi--react",
    "className": "bg-gradient-to-r from-violet-500 to-fuchsia-500"
  },
  "commands": [
    {
      "name": "hello",
      "title": "Hello world",
      "icon": {
        "name": "lucide--list",
        "className": "bg-gradient-to-r from-rose-500 to-purple-500"
      },
      "mode": "preset-ui"
    }
  ]
}
```

## `index.ts`

The `hello.command.ts` file contains the main logic to render the "Hello World" markdown string:

```ts
import { MarkdownApp } from '@penxio/preset-ui'

export async function main() {
  new MarkdownApp({ content: '# Hello world' }).run()
}
```

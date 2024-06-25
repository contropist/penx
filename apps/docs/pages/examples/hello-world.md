# Hello World Example

## Introduction

This document provides a step-by-step guide to creating a simple "Hello World" example.

## Project Structure

The project consists of the following key files:

- `manifest.json`: Contains metadata about the project.
- `index.ts`: The main TypeScript file that renders the "Hello World" message.

## `manifest.json`

The manifest.json file contains metadata about the project, we create a command call **Hello world**.

```json
{
  "name": "hello-world",
  "title": "Hello world",
  "description": "This is a hello world demo.",
  "icon": "logo.svg",
  "commands": [
    {
      "name": "index",
      "title": "Hello world",
      "subtitle": "",
      "description": ""
    }
  ]
}
```

## `index.ts`

The index.ts file contains the main logic to render the "Hello World" markdown string:

```ts
import { MarkdownBuilder, render } from '@penxio/api'

export async function main() {
  render(new MarkdownBuilder('# Hello world'))
}
```

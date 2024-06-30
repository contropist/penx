import { FieldNode } from 'fomir'
import { FomirUIkitNode } from './fomir-uikit/fomir-uikit-node'

type CustomNode = FomirUIkitNode

declare module 'fomir' {
  interface CustomTypes {
    Node: CustomNode & { updatable?: boolean }
    // | {
    //     component: CustomNode['component'] | ({} & string)
    //     [key: string]: any
    //   }
  }
  interface Validators {
    moreThan?: [string, string]
  }
}

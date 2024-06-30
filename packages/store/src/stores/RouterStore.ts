import { atomWithStorage } from 'jotai/utils'
import { StoreType } from '../store-types'
import { IRouterStore, RouteName } from '../types'

export const routerAtom = atomWithStorage('Router', {
  name: '' as any,
} as IRouterStore)

export class RouterStore {
  constructor(private store: StoreType) {}

  get() {
    return this.store.get(routerAtom)
  }

  getName() {
    return this.store.get(routerAtom).name
  }

  set(state: IRouterStore) {
    this.store.set(routerAtom, state)
  }

  routeTo(name: RouteName, params: Record<string, any> = {}) {
    const current = this.store.get(routerAtom)
    if (name === current.name) return
    return this.store.set(routerAtom, {
      name,
      params,
    })
  }

  toNode() {
    this.routeTo('NODE')
  }

  isNode() {
    const routerName = this.getName()
    return routerName === 'NODE'
  }

  isTodos = () => {
    const routerName = this.getName()
    return routerName === 'TODOS'
  }

  isDatabases = () => {
    const routerName = this.getName()
    return routerName === 'DATABASES'
  }

  isSettings = () => {
    const routerName = this.getName()
    return routerName === 'SETTINGS'
  }

  isShowMobileMenu = () => {
    const routerName = this.getName()
    return [
      'TRASH',
      'NODE',
      'SETTINGS',
      'TODOS',
      'DATABASES',
      'CREATE_SPACE',
      'WEB3_PROFILE',
    ].includes(routerName)
  }
}

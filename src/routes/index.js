import { initTestRoute } from './test'
import { initConfigRoute } from './jobConfig'
import { initBuildRoute } from './build'

export function initGlobalRoute (router) {
  initTestRoute(router)
  initConfigRoute(router)
  initBuildRoute(router)
}

import * as controller from '../controller/build'

export function initBuildRoute (router) {
  router.post('/build', controller.build)
}

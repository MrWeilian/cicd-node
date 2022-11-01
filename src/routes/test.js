import * as controller from '../controller/test'

export function initTestRoute (router) {
  router.get('/test', controller.get)

  router.post('/test', controller.post)
}
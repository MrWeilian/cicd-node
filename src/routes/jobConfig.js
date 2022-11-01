import * as controller from '../controller/jobConfig'

export function initConfigRoute (router) {
  router.get('/job', controller.getConfigList)
  router.post('/job/save', controller.save)
  router.post('/job/update', controller.update)
  router.post('/job/delete', controller.del)
}
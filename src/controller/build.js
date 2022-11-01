import * as jobConfig from '../services/jobConfig'
import { RESPONSE_CODE } from '../constant'
import * as jenkins from '../jenkins'

export async function build (ctx, next) {
  const requestBody = ctx.request.body

  const { id } = requestBody

  try {
    const jobName = 'test-config-job'

    const config = await jobConfig.findJobById(id)

    await jenkins.configJob(jobName, config)

    await jenkins.build(jobName)

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '构建失败'
    }
  }

  next()
}

import * as jobConfig from '../services/jobConfig'
import { RESPONSE_CODE } from '../constant'
import * as jenkins from '../jenkins'
import adminInstance from '../builder/admin';

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

export function socketConnect (socket) {
  console.log('connection suc');

  const { id } = socket.handshake.query

  const builder = adminInstance.getBuilder(id, socket)

  socket.on('build:start', async function () {
    console.log('build start');
    await builder.build(socket)
  })
}
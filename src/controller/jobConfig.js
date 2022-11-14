import * as services from '../services/jobConfig'
import { RESPONSE_CODE } from '../constant'

export async function getConfigList (ctx, next) {
  try {
    const { pageNo: page, pageSize, projectName } = ctx.request.query
    const pageData = await services.findJobPage(page, pageSize, { projectName })
    const total = await services.countJob({ projectName })

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: {
        list: pageData,
        page,
        pageSize,
        total
      }
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置分页查询失败'
    }
  }
  next()
}

export async function getConfigDetail (ctx, next) {
  try {
    const { id } = ctx.request.query

    const data = await services.findJobDetail(id)

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置详情查询失败'
    }
  }
  next()
}

export async function save (ctx, next) {
  const requestBody = ctx.request.body

  try {
    await services.save(requestBody)

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置数据保存失败'
    }
  }

  next()
}

export async function update (ctx, next) {
  const requestBody = ctx.request.body
  const { id } = requestBody
  try {
    await services.update(id, requestBody)
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置数据更新失败'
    }
  }
  next()
}

export async function del (ctx, next) {
  const { id }  = ctx.request.body

  try {
    await services.deleteById(id)
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置删除失败'
    }
  }
}
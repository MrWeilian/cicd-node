import { RESPONSE_CODE } from '../constant'

export function get (ctx, next) {
  ctx.state.apiResponse = {
    code: RESPONSE_CODE.SUC,
    data: { name: '井柏然-get(放在controller里啦 ！)' }
  }
  next()
}

export function post (ctx, next) {
  ctx.body = {
    code: 0,
    data: { name: '井柏然-post' }
  }
  next()
}


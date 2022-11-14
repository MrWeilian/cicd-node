import Koa from 'koa'
import Router from '@koa/router'
import { createServer } from 'http'
import { initGlobalRoute } from './routes'
import { handleResponse } from './middleware'
import * as db from './mongoose'
import KoaBody from 'koa-body'
import initBuildSocket from './routes/socket'

const app = new Koa();
const router = new Router()
const httpServer = createServer(app.callback());
db.connect()

app.use(KoaBody({
  multipart: true
}));

initBuildSocket(httpServer)

app.use(handleResponse())

initGlobalRoute(router)

app
  .use(router.routes())
  .use(router.allowedMethods())

httpServer.listen(3200);

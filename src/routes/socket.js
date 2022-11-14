import { Server } from 'socket.io'
import * as controller from '../controller/build'

export default function initBuildSocket (httpServer) {
  const io = new Server(httpServer, {
    path: '/jenkins/build'
  })
  io.on('connection', controller.socketConnect)
}
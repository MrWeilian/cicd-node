import mongoose from 'mongoose'
import config from '../config'

const db = mongoose.connection

export const connect = function () {
  mongoose.connect(config.db.uri)
  db.on('error', console.error.bind(console, 'mongodb connect error'))
  db.once('open', console.log.bind(console, 'mongodb connect success'))
}
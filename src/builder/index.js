import * as jobConfig from '../services/jobConfig';
import * as jenkins from '../jenkins';

export default class Build {
  constructor (id, delBuilderFn) {
    this.id = id // 配置 id
    this.rollBackHash = '' // 配置 id
    this.isBuilding = false // 构建状态
    this.logStream = null // 存放 logStream 实例
    this.logStreamText = '' // 存放构建日志（防止构建中途进来的用户丢失之前的构建日志）
    this.buildNumber = '' // 存放构建 number
    this.delBuilderFn = delBuilderFn
  }

  async build (socket, rollBackHash) {
    this.isBuilding = true // 改变构建状态

    const jobName = 'test-config-job'

    const config = await jobConfig.findJobById(this.id)

    await jenkins.configJob(jobName, config, rollBackHash)

    const { buildNumber, logStream } = await jenkins.build(jobName)

    this.buildNumber = buildNumber
    this.logStream = logStream

    this.logStream.on('data', (text) => {
      // 这里只有在构建的时候执行一次，保证每次 logStreamText 不会因为多个相同监听造成 logStreamText 叠加问题
      this.logStreamText += text
    });

    this.initLogStream(socket)
  }

  stop () {}

  initLogStream (socket) {
    if (!this.logStream) return

    // 注意：这里 socket 是保存到闭包里面的
    this.logStream.on('data', () => {
      socket.emit('build:data', this.logStreamText)
    });

    this.logStream.on('error', (err) => {
      console.log('error', err);
      socket.emit('build:error', err)
      this.isBuilding = false // 改变构建状态
      this.delBuilderFn(this.id) // 删除 map 缓存
    });

    this.logStream.on('end', () => {
      console.log('end');
      socket.emit('build:end')
      this.isBuilding = false // 改变构建状态
      this.delBuilderFn(this.id) // 删除 map 缓存
    });
  }

  destroy () {
    // 等着被GC吧
    this.id = null
    this.isBuilding = null
    this.logStream = null
    this.logStreamText = null
    this.buildNumber = null
  }
}
import Build from './index'

class Admin {
  constructor() {
    this.map = {}
  }

  getBuilder (id, socket) {
    if (Reflect.has(this.map, id)) {
      this.map[id].initLogStream(socket)
      return this.map[id]
    }
    return this.createBuilder(id)
  }

  createBuilder (id) {
    const builder = new Build(id, this.delBuilder.bind(this))
    this.map[id] = builder
    return builder
  }

  delBuilder (id) {
    this.map[id] && this.map[id].destroy()
    Reflect.deleteProperty(this.map, id)
  }
}

export default new Admin()
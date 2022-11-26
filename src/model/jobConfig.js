import mongoose from 'mongoose'

const configSchema = new mongoose.Schema({
  projectName: {
    type: String
  },
  gitUrl: {
    type: String
  },
  gitBranch: {
    type: String
  },
  buildCommand: {
    type: String
  },
  uploadPath: {
    type: String
  },
  history: {
    type: Array
  }
})

export default mongoose.model('jobConfig', configSchema)

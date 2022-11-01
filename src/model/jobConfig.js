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
  }
})

export default mongoose.model('jobConfig', configSchema)

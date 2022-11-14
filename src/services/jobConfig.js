import JobModel from '../model/jobConfig'

export async function findJobPage (page, pageSize, params) {
  Object.keys(params).forEach(key => {
    if (!params[key]) Reflect.deleteProperty(params, key)
  })

  const DocumentUserList = await JobModel.find(params)
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  return DocumentUserList.map(_ => _.toObject())
}

export function countJob (params) {
  Object.keys(params).forEach(key => {
    if (!params[key]) Reflect.deleteProperty(params, key)
  })

  return JobModel.count(params)
}

export function findJobDetail (id) {
  return JobModel.findById(id)
}

export function save (params) {
  return new JobModel(params).save()
}

export function update (id, params) {
  return JobModel.findByIdAndUpdate(id, params)
}

export function deleteById (id) {
  return JobModel.findByIdAndDelete(id)
}

export function findJobById (id) {
  return JobModel.findById(id)
}

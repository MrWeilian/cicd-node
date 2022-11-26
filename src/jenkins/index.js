import createJenkins from "jenkins"
import getXML from './jobConfig'

const config = {
  user: '',
  token: '',
  instance: '',
  assignedNode: ''
}

// const jenkins = createJenkins({
//   baseUrl: `http://${config.user}:${config.token}@${config.instance}`,
//   promisify: true,
// })
// 需要自行配置jenkins config
const jenkins = {}

export async function configJob (jobName, config, rollBackHash) {
  const isExist = await jenkins.job.exists(jobName)
  const jksConfig = getXML(config.buildCommand, rollBackHash)
  if (!isExist) {
    return jenkins.job.create(jobName, jksConfig)
  }
  return jenkins.job.config(jobName, jksConfig)
}

export async function build (jobName) {
  const buildId = await jenkins.job.build(jobName)
  const buildNumber = await waitForBuildNumber(buildId)
  console.log(buildNumber);
  const logStream = jenkins.build.logStream(jobName, buildNumber, "text", 2000)

  logStream.on('data', function(text) {
    console.log(text);
  });

  logStream.on('error', function(err) {
    console.log('error', err);
  });

  logStream.on('end', function() {
    console.log('end');
  });
  return {
    buildNumber,
    logStream,
  }
}

function waitForBuildNumber(buildId) {
  return new Promise(function (resolve, reject) {
    const timer = setInterval(async function () {
      try {
        const item = await jenkins.queue.item(buildId)
        if (item.executable) {
          resolve(item.executable.number)
          clearInterval(timer)
        } else if (item.cancelled) {
          clearInterval(timer)
          reject()
        }
      } catch (e) {
        reject(e)
      }
    }, 500)
  })
}
import development from './development.env'
import production from './production.env'

const envConfigs = {
  development,
  production
}

const config = (function (env) {
  return envConfigs[env]
})(process.env.NODE_ENV)

export default config
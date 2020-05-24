import data from './dataStore.js'
import nJwt from 'njwt'
import { Model as User } from '../schemas/User'

export async function decode (jwt) {
  try {
    let user = { ...nJwt.verify(jwt, data.cryptoKey).body };
    // Do some cache thing so that the database isn't always requested.
    // Redis? Local cache with timer?
    user.admin = Boolean(await User.findOne({_id: user.sub, admin: true}))
    return user;
  } catch {
    return null
  }
}

export function authWrapper (callback, options) {
  let authOptions = {
    // LOGIN // If true, only authenticated users are allowed access
    // LOGIN // If false, guest users are allowed access
    login: true,

    // ADMIN // If true, only administrators are allowed access - implies `login: true`
    admin: false
  }

  authOptions = { ...authOptions, ...(options || {}) }

  return async function (req, res, next) {
    let token = req.cookies.token
    if (!token && req.headers.authorization) {
      let [type, key] = req.headers.authorization.split(' ')
      if (type === 'Bearer') {
        token = key
      }
    }

    let claim = (req.session = await decode(token))
    if (
      (authOptions.login && !claim) ||
      (authOptions.admin && (!claim || !claim.admin))
    ) {
      res.writeHead(403)
      res.write(JSON.stringify({ status: false, error: 'Not authorised' }))
      return res.end()
    }

    return callback(req, res, next)
  }
}

export function createToken (claim) {
  return nJwt.create(claim, data.cryptoKey).compact()
}

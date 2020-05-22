import data from './data.js'
import nJwt from 'njwt'

export function decode (jwt) {
  try {
    return { ...nJwt.verify(jwt, data.cryptoKey).body }
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

  return function (req, res, next) {
    let claim = decode(req.cookies.token)
    console.log(claim);
    if (
      (authOptions.login && !claim) ||
      (authOptions.admin && (!claim || !claim.admin))
    ) {
      res.write(JSON.stringify({ status: false, error: 'Not authorised' }))
      res.statusCode = 403
      return res.end()
    } else {
      return callback(...arguments)
    }
  }
}

export function createToken (claim) {
  return nJwt.create(claim, data.cryptoKey).compact()
}

import { createToken } from '../../lib/jwtTools'
import fetch from 'node-fetch'
import elvanto from 'elvanto-api'
import { Model as User } from '../../schemas/User'

// Create during testing
;(async function () {
  try {
    await User.create({
      username: 'admin',
      isLocal: true,
      password: 'password',
      admin: true
    })
  } catch {}
  console.log('Created test user')
})()

async function handleLocal (username, password) {
  let user = await User.findOne({
    username: username,
    isLocal: true
  })
  if (!user) {
    return JSON.stringify({
      status: false,
      error: 'Invalid username / password'
    })
  }

  if (user.disabled) {
    return JSON.stringify({
      status: false,
      error: 'Your account is disabled'
    })
  }

  if (user && user.verifyPasswordSync(password)) {
    return JSON.stringify({
      status: true,
      jwt: createToken({
        sub: user._id,
        name: user.firstName || user.username
      })
    })
  } else {
    return JSON.stringify({
      status: false,
      error: 'Invalid username / password'
    })
  }
}

async function handleElvanto (token) {
  let Elvanto = new elvanto.Client({
    accessToken: token
  })

  let userInfo = await Elvanto.apiCall('people/currentUser')
  if (userInfo.status === 'ok') {
    let userData = userInfo.person[0]

    let user = await User.findOneAndUpdate(
      {
        username: userData.id,
        isLocal: false
      },
      {
        firstName: userData.preferred_name || userData.firstname,
        lastName: userData.lastname
      },
      { new: true, upsert: true }
    )

    if (user.disabled) {
      return JSON.stringify({
        status: false,
        error: 'Your account is disabled'
      })
    }

    return JSON.stringify({
      status: true,
      jwt: createToken({
        sub: user._id,
        name: user.firstName
      })
    })
  } else {
    return JSON.stringify({
      status: false,
      error: 'OAuth failure'
    })
  }
}

export async function post (req, res, next) {
  switch (req.body.type) {
    case 'local':
      return res.end(await handleLocal(req.body.username, req.body.password))
    case 'elvanto':
      return res.end(await handleElvanto(req.body.token))
    default:
      res.write(
        JSON.stringify({
          status: false,
          error: 'Invalid login scheme'
        })
      )
      res.statusCode = 401
      return res.end()
  }
}

import nJwt from 'njwt'
import data from '../../data'
import fetch from 'node-fetch'
import elvanto from 'elvanto-api'
import { Model } from '../../schemas'

Model.User.create({username: 'admin', isLocal:true,password: 'password'})

async function handleLocal (username, password) {
  let user = await Model.User.findOne({
    username: 'admin',
    isLocal: true
  })

  if (user && user.verifyPasswordSync(password)) {
    return JSON.stringify({
      status: true,
      jwt: nJwt
        .create(
          {
            sub: user.username,
            name: user.firstName || user.username,
            admin: user.admin
          },
          data.cryptoKey
        )
        .compact()
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

    let user = await Model.User.findOneAndUpdate(
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

    return JSON.stringify({
      status: true,
      jwt: nJwt
        .create(
          {
            sub: user.username,
            name: user.firstName,
            admin: user.admin
          },
          data.cryptoKey
        )
        .compact()
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

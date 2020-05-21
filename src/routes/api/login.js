import nJwt from 'njwt'
import data from '../../data'
import fetch from 'node-fetch'
import elvanto from 'elvanto-api'

async function handleLocal (username, password) {
  // TODO: connect with mongo db --- user.id
  if (username === 'admin' && password === 'password') {
    return
    JSON.stringify({
      status: true,
      jwt: nJwt
        .create(
          {
            sub: '0',
            name: 'root',
            admin: true
          },
          data.cryptoKey
        )
        .compact()
    })
  } else {
    return
    JSON.stringify({ status: false, error: 'Invalid username / password' })
  }
}

async function handleElvanto (token) {
  let Elvanto = new elvanto.Client({
    accessToken: token
  })
  let userInfo = await Elvanto.apiCall('people/currentUser')

  if (userInfo.status === 'ok') {
    let user = userInfo.person[0]
    // user.status;

    //     id: user.id,
    //     first_name: user.preferred_name || user.firstname,
    //     last_name: user.lastname
  } else {
    return JSON.stringify({ status: false, error: 'OAuth failure' })
  }
}

export async function post (req, res, next) {
  switch (req.body.type) {
    case 'local':
      return res.end(handleLocal(req.body.username, req.body.password))
    case 'elvanto':
      return res.end(handleElvanto(req.body.token))
    default:
      return res.end(
        JSON.stringify({ status: false, error: 'Invalid login scheme' })
      )
  }
}

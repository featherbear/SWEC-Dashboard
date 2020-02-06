const redirect = require('@polka/redirect')
const fetch = require('node-fetch')
const elvanto = require('elvanto-api')

export async function get (req, res, next) {
  const {
    elvantoClientID,
    elvantoClientSecret,
    elvantoOAuthReturn
  } = process.env

  if (req.query['code']) {
    let data = await fetch(
      `http://localhost:1337/connect/elvanto/callback?code=${req.query.code}`,
      {
        credentials: 'include',
        headers: {
          cookie: req.headers.cookie
        }
      }
    ).then(r => r.json())

    console.log(data)

    if (data.error) {
      res.write(JSON.stringify(data))
      res.statusCode = data.statusCode
      return res.end()
    }

    res.cookie('jwtToken', data.jwt, {
      path: '/'
    })
    res.cookie('user', JSON.stringify(data.user), {
      path: '/'
    })
    
    res.redirect('/')

    res.end()
  } else {
    return redirect(
      res,
      'http://localhost:1337/connect/elvanto?redirect_uri=http%3A%2F%2Flocalhost:3000/login/oauth'
    )
  }
}

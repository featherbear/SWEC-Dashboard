const redirect = require('@polka/redirect')
const fetch = require('node-fetch')
const elvanto = require('elvanto-api')

export async function get (req, res, next) {
  const {
    ELVANTO_CLIENT_ID,
    ELVANTO_CLIENT_SECRET,
    ELVANTO_OAUTH_RETURN
  } = process.env

  if (!req.query['code']) {
    return redirect(
      res,
      `https://api.elvanto.com/oauth?type=web_server&client_id=${ELVANTO_CLIENT_ID}&redirect_uri=${ELVANTO_OAUTH_RETURN}&scope=ManagePeople,ManageCalendar`
    )
  }

  console.log(
    JSON.stringify({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: ELVANTO_CLIENT_ID,
      client_secret: ELVANTO_CLIENT_SECRET,
      redirect_uri: ELVANTO_OAUTH_RETURN
    })
  )

  let data = await fetch('http://api.elvanto.com/oauth/token', {
    method: 'POST',
    body: `grant_type=authorization_code&client_id=${ELVANTO_CLIENT_ID}&client_secret=${ELVANTO_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=${ELVANTO_OAUTH_RETURN}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(r => r.json())

  if (data.error) {
    res.write(JSON.stringify(data))
    res.statusCode = data.statusCode
    return res.end()
  }

  // res.cookie('token', data.jwt, {
  //   path: '/'
  // })

  res.redirect('/')

  res.end()
}

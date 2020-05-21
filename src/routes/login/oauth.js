import redirect from '@polka/redirect'
import fetch from 'node-fetch'
import elvanto from 'elvanto-api'

export async function get (req, res, next) {
  const {
    ELVANTO_CLIENT_ID,
    ELVANTO_CLIENT_SECRET,
    ELVANTO_OAUTH_RETURN
  } = process.env

  if (!req.query['code']) {
    return redirect(
      res,
      elvanto.authorizeUrl(ELVANTO_CLIENT_ID, ELVANTO_OAUTH_RETURN, ["ManagePeople","ManageCalendar"])
    )
  }

  let token_data = await elvanto.exchangeToken(ELVANTO_CLIENT_ID, ELVANTO_CLIENT_SECRET, req.query.code, ELVANTO_OAUTH_RETURN)

  if (token_data.error) {
    res.write(JSON.stringify(token_data))
    res.statusCode = token_data.statusCode
    return res.end()
  }

  let { access_token } = token_data

  let data = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      type: 'elvanto',
      token: access_token
    })
  }).then(r => r.json())

  if (data.status) {
    res.cookie('token', data.jwt, {
      path: '/'
    })
  }

  res.redirect('/')
  res.end()
}

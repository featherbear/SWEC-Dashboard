const redirect = require('@polka/redirect')

const elvanto = require('elvanto-api')

export async function get (req, res, next) {
  const { elvantoClientID, elvantoClientSecret, elvantoOAuthReturn } = process.env

  if (req.query.code) {
    // Get Elvanto UID
    let { accessToken } = await elvanto.exchangeToken(elvantoClientID, elvantoClientSecret, req.query.code, elvantoOAuthReturn)
    let client = new elvanto.Client({ accessToken })
    let data = await client.apiCall('people/currentUser')

    res.end(data['person'][0]['id'])
  } else {
    return redirect(res, elvanto.authorizeUrl(elvantoClientID, elvantoOAuthReturn, ['ManagePeople', 'ManageCalendar']))
  }
}

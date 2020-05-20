export async function get (req, res, next) {
  res.cookie('token', '', {
	path: '/',
	expires: new Date(0)
  })
  res.redirect('/')
  res.end()
}

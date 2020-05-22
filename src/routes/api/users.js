import { Model as User } from '../../schemas/User'
import { authWrapper } from '../../lib/jwtTools'

export const get = authWrapper(
  async function (req, res, next) {
    return res.end(JSON.stringify(await User.find({}, { password: false })))
  },
  { admin: true }
)

export const post = authWrapper(
  async function (req, res, next) {
    // User.create({
    //   username: req.body.username,
    //   isLocal: true,
    //   password: req.body.password,
    //   admin: req.body.admin || undefined
    // })

    return res.end(JSON.stringify({ status: true }))
  },
  {
    admin: true
  }
)

export const put = authWrapper(
  async function (req, res, next) {
    let user = User.find({ _id: req.body.id })
    if (!user) {
      res.writeHead(400)
      return res.end(JSON.stringify({ status: false, error: 'User not found' }))
    }

    // change password
    // change name (local accounts only)
    // lock / unlock
    // delete

    return res.end(JSON.stringify({ status: true }))
  },
  {
    admin: true
  }
)

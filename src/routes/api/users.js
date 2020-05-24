import { Model as User } from '../../schemas/User'
import { authWrapper } from '../../lib/jwtTools'

export const get = authWrapper(
  async function (req, res, next) {
    let data = await User.find({}, { password: false }, { lean: true })
    // // {[id: ID, a: ..., b: ..., c: ...], ...} to {id: {a: ..., b: ..., c: ...}, ...}
    // data = Object.fromEntries(
    //   data.map(({ _id, ...userData }) => [_id, userData])
    // )
    return res.end(JSON.stringify(data))
  },
  { admin: true }
)

export const post = authWrapper(
  async function (req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.end(
        JSON.stringify({
          status: false,
          error: 'Username or password not valid'
        })
      )
    }

    let user
    try {
      user = await User.create({
        username: req.body.username,
        password: req.body.password,
        admin: Boolean(req.body.admin),
        isLocal: true
      })
    } catch (err) {
      return res.end(
        JSON.stringify({ status: false, error: 'Username exists' })
      )
    }

    return res.end(JSON.stringify({ status: true }))
  },
  {
    admin: true
  }
)

export const patch = authWrapper(
  async function (req, res, next) {
    let data = {}

    if (!req.body.id) {
      return res.end(JSON.stringify({ status: false }))
    }

    if (req.body.hasOwnProperty('password')) {
      if (!req.body.password) {
        return res.end(
          JSON.stringify({ status: false, error: 'Password not valid' })
        )
      }
      data.password = req.body.password
    }

    if (req.body.hasOwnProperty('disabled')) {
      data.disabled = Boolean(req.body.disabled)
    }

    if (req.body.hasOwnProperty('admin')) {
      data.admin = Boolean(req.body.admin)
    }

    if (Object.keys(data).length == 0) {
      return res.end(
        JSON.stringify({ status: false, error: 'Nothing to update' })
      )
    }

    let user = await User.findByIdAndUpdate(req.body.id, data)
    if (!user) {
      res.writeHead(400)
      return res.end(JSON.stringify({ status: false, error: 'User not found' }))
    }

    // change name (local accounts only)

    return res.end(JSON.stringify({ status: true }))
  },
  {
    admin: true
  }
)

export const del = authWrapper(
  async function (req, res, next) {
    if (req.body.id && (await User.findByIdAndRemove(req.body.id))) {
      return res.end(JSON.stringify({ status: true }))
    }
    return res.end(JSON.stringify({ status: false }))
  },
  { admin: true }
)

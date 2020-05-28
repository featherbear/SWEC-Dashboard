import { Model as Site } from '../../schemas/Site'
import { authWrapper } from '../../lib/jwtTools'

Site.create({
  title: 'Test title'
})

export async function get (req, res, next) {
  let sites = await Site.find({}, null, { lean: true })
  // {[id: ID, a: ..., b: ..., c: ...], ...} to {id: {a: ..., b: ..., c: ...}, ...}
  sites = Object.fromEntries(sites.map(({ _id, ...data }) => [_id, data]))

  return res.end(JSON.stringify(sites))
}

export const post = authWrapper(
  async function (req, res, next) {
    try {
      const site = await Site.create({
        title: req.body.title,
        custom: req.body.custom
      })
      return res.end(JSON.stringify({ status: true, id: site._id }))
    } catch {
      return res.end(JSON.stringify({ status: false }))
    }
  },
  {
    admin: true
  }
)

export const patch = authWrapper(
  async function (req, res, next) {
    try {
      const site = await Site.findOneAndUpdate(
        { _id: req.body.id },
        {
          title: req.body.title,
          custom: req.body.custom
        },
        { lean: true, new: true, overwrite: true }
      )
      return res.end(JSON.stringify({ status: true }))
    } catch {
      return res.end(JSON.stringify({ status: false }))
    }
  },
  {
    admin: true
  }
)

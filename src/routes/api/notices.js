import { Model as Notice } from '../../schemas/Notice'
import { Model as User } from '../../schemas/User'

import { authWrapper } from '../../lib/jwtTools'

export const get = authWrapper(async function (req, res, next) {
  // Get all notices if admin
  let notices = await Notice.find(req.session.admin ? {} : { active: true })

  return res.end(JSON.stringify(notices))
})

export const post = authWrapper(
  async function (req, res, next) {
    const notice = await Notice.create({
      author: req.session.sub,
      title: req.body.title,
      sites: req.body.sites,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: true
    })

    return res.end(JSON.stringify({ status: true }))
  },
  {
    admin: true
  }
)

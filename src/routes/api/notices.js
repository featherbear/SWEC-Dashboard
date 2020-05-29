import { Model as Notice } from '../../schemas/Notice'
import { Model as User } from '../../schemas/User'

import { authWrapper } from '../../lib/jwtTools'

export const get = authWrapper(async function (req, res, next) {
  // Get all notices if admin
  let query = {}
  if (req.session) {
    if (!req.session.admin) {
      query = {
        $or: [
          { author: req.session.sub, active: true },
          { active: true, approved: true }
        ]
      }
    }
  } else {
    query = { active: true, approved: true }
  }

  let notices = await Notice.find(query)

  return res.end(JSON.stringify(notices))
})

export const post = authWrapper(
  async function (req, res, next) {
    let approved = Boolean(req.session.admin)

    const notice = await Notice.create({
      author: req.session.sub,
      title: req.body.title,
      sites: req.body.sites,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: true,
      approved
    })

    return res.end(JSON.stringify({ status: true }))
  },
  {
    login: true
  }
)

import { Model as Site } from '../../schemas/Site'

Site.create({
  title: 'Test title'
})

export async function get (req, res, next) {
  let sites = await Site.find({}, null, {lean: true})
  // {[id: ID, a: ..., b: ..., c: ...], ...} to {id: {a: ..., b: ..., c: ...}, ...}
  sites = Object.fromEntries(
    sites.map(({ _id, ...data }) => [_id, data])
  )

  return res.end(JSON.stringify(sites))
}

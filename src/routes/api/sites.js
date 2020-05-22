import { Model as Site } from '../../schemas/Site'

Site.create({
  title: 'Test title'
})

export async function get (req, res, next) {
  return res.end(JSON.stringify(await Site.find()))
}

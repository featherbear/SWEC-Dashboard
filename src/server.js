import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

import { json } from 'body-parser'
import cookierParser from 'cookie-parser'

import jwt_decode from 'jwt-decode'

// import dotenv from 'dotenv'

// import core from './backend/core'
// dotenv.config()

// global.core = new core()

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

import './components/ServerResponse-CookiePolyfill'
import './components/ServerResponse-RedirectPolyfill'

polka() // You can also use Express
  .use(
    json(),
    cookierParser(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => {
        let data = null

        try {
          data = jwt_decode(req.cookies.token)
          data.token = req.cookies.token
          
          if (data.exp < Date.now() / 1000) {
            data = null
          }
        } catch (e) {
          data = null
        }

        return data
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })

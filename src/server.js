import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

import { json } from 'body-parser'
import cookierParser from 'cookie-parser'

import dotenv from 'dotenv'
dotenv.config()

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

import './lib/ServerResponse-CookiePolyfill'
import './lib/ServerResponse-RedirectPolyfill'
import { decode } from './lib/jwtTools'

import mongoose from 'mongoose'
mongoose
  .connect(process.env.MONGO_DB_ADDRESS, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(({ connection }) => {
    polka()
      .use(
        json(),
        cookierParser(),
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware({
          session: (req, res) => {
            return decode(req.cookies.token)
          }
        })
      )
      .listen(PORT, err => {
        if (err) console.log('error', err)
      })
  })

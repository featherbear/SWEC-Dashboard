import fetch from 'node-fetch'
import mongoose from 'mongoose'


export async function post (req, res, next) {
  let response = await fetch('http://localhost:3000/api/login', {
    body: JSON.stringify({
      type: 'local',
      username: req.body.username,
      password: req.body.password
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())

  if (response.status) {
    res.cookie('token', response.jwt, {
      path: '/'
    })
    return res.end(JSON.stringify({ success: true }))
  }

  return res.end(JSON.stringify(response))
}

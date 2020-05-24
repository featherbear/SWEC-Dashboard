import fs from 'fs'

let cryptoKey
try {
  cryptoKey = Buffer.from(fs.readFileSync('.key', 'utf8'))
} catch (err) {
    cryptoKey = require('secure-random')(256, { type: 'Buffer' })
    fs.writeFileSync('.key', cryptoKey, 'utf8')
    console.log('Generated secure key')
}

let admins = [];
console.log("a");

export default {
  cryptoKey,
  admins
}

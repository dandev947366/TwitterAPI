const crypto = require('crypto')
// CREATE KEYS  
const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')

console.log({key1, key2})
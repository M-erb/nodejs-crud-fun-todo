const jwt = require('jwt-simple')
const secret = 'BQc8$J)jZaCpD@;}'

module.exports = {
  encode(payload) {
    return jwt.encode(payload, secret)
  },
  decode(token) {
    return jwt.decode(token, secret)
  },
  compare(token, payload, secret) {
    // WIP
    return true
  }
}
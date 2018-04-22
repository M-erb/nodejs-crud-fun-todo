const jwt = require('jwt-simple')
const secret = 'BQc8$J)jZaCpD@;}'
const User = require('../models/user.js')

module.exports = {
  genToken(data) {
    // create jwt token
    let payload = {
      userName: data.userName,
      password: data.password
    }
    return jwt.encode(payload, secret)
  },
  decode(token) {
    return jwt.decode(token, secret)
  },
  verifyAuth(req, res, next) {
    console.log('jwt middleware', req.body, req.get('auth'))
    let user = User.find().equals('jwt', req.get('auth')).run()
    if (user.length) {
      console.log('jwt success!', user)
      next()
    } else {
      console.log('jwt denied!', user)
      return res.status(401).send({
        result: 'authorization denied'
      })
    }
  }
}
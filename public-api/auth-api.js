const config = require('../config')
config.dbConfig
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (app) => {
  app.post('/api/regestration', config.jsonParser, (req, res) => {
    if (req.body) {
      // required fields
      if (!req.body.userName) return res.status(400).send({
        result: 'User Name is required'
      })
      if (!req.body.password) return res.status(400).send({
        result: 'Password is required'
      })
      if (!req.body.confirmPass) return res.status(400).send({
        result: 'Confirm password is required'
      })
      if (req.body.password !== req.body.confirmPass) return res.status(400).send({
        result: 'Passwords do not match'
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          User.add({
            userName: req.body.userName,
            password: hash,
            firstName: req.body.firstName || '',
            lastName: req.body.lastName || '',
            emailAddress: req.body.emailAddress || ''
          })
          res.status(200).send({
            result: User.all()
          })
        })
      })
    } else {
      return res.status(400).send({
        result: 'Required fields missing'
      })
    }
  })

  app.post('/api/login', config.jsonParser, (req, res) => {
    if (req.body) {
      // required fields
      if (!req.body.userName) return res.status(400).send({
        result: 'User Name is required'
      })
      if (!req.body.password) return res.status(400).send({
        result: 'Password is required'
      })

      let user = User.find().equals('userName', req.body.userName).run()
      if (user.length) {
        return bcrypt.compare(req.body.password, user[0].password, (err, isSuccess) => {
          if (isSuccess) {
            res.status(200).send({
              result: 'Valid password'
            })
          } else {
            res.status(400).send({
              result: 'User name and/or password is incorrect'
            })
          }
        })
      } else {
        return res.status(400).send({
          result: 'User name and/or password is incorrect'
        })
      }
    } else {
      return res.status(400).send({
        result: 'Required fields missing'
      })
    }
    return res.status(500).send({
      result: 'Unhandled exeption'
    })
  })
}
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
    console.log('api/login', req.body)
    if (req.body) {
      // required fields
      if (!req.body.userName) return res.status(400).send({
        result: 'User Name is required'
      })
      if (!req.body.password) return res.status(400).send({
        result: 'Password is required'
      })

      let users = User.all()
      console.log('users', users, users.length)
      if (users.length) {
        console.log('in if statement, right before for loop');
        for (let i; i < users.length; i++) {
          console.log('in loop', users[i], i);
          // if (users[i].userName === req.body.userName) {
          //   bcrypt.compare(req.body.password, users[i].password, (bErr, bRes) => {
          //     if (res) {
          //       res.status(200).send({
          //         result: "logged in!"
          //       })
          //     } else {
          //       result: err
          //     }
          //   })
          //   break
          // } else if (i > users.length) {
          //   res.status(400).send({
          //     result: 'User name does not exist'
          //   })
          //   break
          // }
        }
      } else {
        res.status(400).send({
          result: 'User name and/or password is incorrect'
        })
      }
    } else {
      res.status(400).send({
        result: 'Required fields missing'
      })
    }
    // res.status(500).send({
    //   result: 'Unhandled exeption'
    // })
  })
}
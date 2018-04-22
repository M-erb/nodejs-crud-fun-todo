const db = require('flat-db')
const config = require('../config')
config.dbConfig

module.exports = new db.Collection('user', {
  userName: '',
  password: '',
  firstName: '',
  lastName: '',
  emailAddress: '',
  jwt: ''
})
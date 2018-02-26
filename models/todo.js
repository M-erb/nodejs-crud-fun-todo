const db = require('flat-db')
const config = require('../config')
config.dbConfig

module.exports = new db.Collection('todo', {
  title: '',
  text: '',
  priority: '',
  isDone: false
})
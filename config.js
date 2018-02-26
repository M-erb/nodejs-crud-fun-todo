const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('flat-db')

module.exports.dbConfig = db.configure({
  dir: './storage'
})
module.exports.urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports.jsonParser = bodyParser.json()

// console.log('testing yo', bodyParser.json())
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('flat-db')

module.exports = {
  dbConfig: db.configure({
    dir: './storage'
  }),
  urlencodedParser: bodyParser.urlencoded({ extended: false }),
  jsonParser: bodyParser.json()
}

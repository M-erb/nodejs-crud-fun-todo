const config = require('../config')
config.dbConfig

const ToDo = require('../models/todo')

module.exports = (app) => {
  app.get('/api/todo', (req, res) => {
    res.status(200).send({
      result: ToDo.all()
    })
  })
  app.put('/api/todo', config.jsonParser, (req, res) => {
    if (req.body.id && req.body.data) {
      var key = ToDo.update(req.body.id, req.body.data)
      res.status(200).send({
        result: key
      })
    } else {
      res.status(400).send({
        result: "Required parameters missing"
      })
    }
  })
  app.post('/api/todo', config.jsonParser, (req, res) => {
    if (req.body) {
      var key = ToDo.add(req.body)
      res.status(200).send({
        result: key
      })
    } else {
      res.status(400).send({
        result: "Required parameters missing"
      })
    }
  })
  app.delete('/api/todo', config.jsonParser, (req, res) => {
    if (req.body.id) {
      var payload = ToDo.remove(req.body.id)
      res.status(200).send({
        result: payload
      })
    } else {
      res.status(400).send({
        result: "Required parameters missing"
      })
    }
  })

  app.get('/api/count-todos', (req, res) => {
    res.status(200).send({
      result: ToDo.count()
    })
  })
}
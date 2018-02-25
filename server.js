const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('flat-db')

app.use('/', express.static(__dirname + '/www'))
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

db.configure({
  dir: './storage'
})

var ToDo = new db.Collection('todo', {
  title: '',
  text: '',
  priority: '',
  isDone: false
})

app.get('/get-todos', (req, res) => {
  res.send(ToDo.all())
})
app.put('/update-todo', jsonParser, (req, res) => {
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
app.post('/add-todo', jsonParser, (req, res) => {
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
app.delete('/delete-todo', jsonParser, (req, res) => {
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


app.get('/count-todos', (req, res) => {
  res.status(200).send({
    result: ToDo.count()
  })
})

app.listen(3000);
console.log('Server Started, listening on port 3000')
console.log('visit: http://localhost:3000')
const express = require('express')
const app = express()
const db = require('flat-db')

app.use('/', express.static(__dirname + '/www'))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })



db.configure({
  dir: './storage'
})

var ToDo = new db.Collection('movies', {
  title: '',
  text: '',
  priority: ''
})

// var keys = ToDo.add([{
//   title: 'must do',
//   text: 'This is an important todo',
//   priority: 'high'
// }, {
//   title: 'must do',
//   text: 'This is an important todo',
//   priority: 'high'
// }, {
//   title: 'must do',
//   text: 'This is an important todo',
//   priority: 'high'
// }, {
//   title: 'must do',
//   text: 'This is an important todo',
//   priority: 'high'
// }, {
//   title: 'must do',
//   text: 'This is an important todo',
//   priority: 'high'
// }])

// console.log('\nkeys returned after adding multi items:');
// console.log(keys);

app.get('/todos', (req, res) => {
  res.send(ToDo.all())
})
app.get('/todos-count', (req, res) => {
  res.send(JSON.stringify(ToDo.count()))
})

app.listen(3000);
console.log('Server Started, listening on port 3000')
console.log('visit: http://localhost:3000')
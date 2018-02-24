var db = require('flat-db')

db.configure({
  dir: './storage'
})

var toDos = [{
  title: 'must do',
  text: 'This is an important todo',
  priority: 'high'
}, {
  title: 'must do',
  text: 'This is an important todo',
  priority: 'high'
}, {
  title: 'must do',
  text: 'This is an important todo',
  priority: 'high'
}, {
  title: 'must do',
  text: 'This is an important todo',
  priority: 'high'
}, {
  title: 'must do',
  text: 'This is an important todo',
  priority: 'high'
}]
const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/www'))

require('./secure-api')(app)

app.listen(3000);
console.log('Server Started, listening on port 3000')
console.log('visit: http://localhost:3000')
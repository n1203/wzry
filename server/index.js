const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

require('./routes/admin/index')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
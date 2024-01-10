const express = require('express')
const app = express()
PORT = 8080
const {dbConnection} = require('./config/config.js')

app.use(express.json())

dbConnection()

app.use('/products', require('./routes/products'))

app.listen(PORT, () => console.log('server started at port ' + PORT))
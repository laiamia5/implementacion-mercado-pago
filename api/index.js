const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mercadoRouter = require('./mercadoPago')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/', mercadoRouter)

app.listen(3001, () => {
    console.log('corriendo en el puerto 3001')
})
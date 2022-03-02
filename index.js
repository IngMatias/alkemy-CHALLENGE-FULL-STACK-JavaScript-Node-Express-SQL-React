require('dotenv').config()

const path = require('path')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')))

const movementAPI = require('./src/routes/movements')
app.use('/movementsAPI', movementAPI)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port',process.env.PORT)
})
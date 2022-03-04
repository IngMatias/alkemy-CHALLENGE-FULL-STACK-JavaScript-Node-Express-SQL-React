require('dotenv').config()

const path = require('path')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')))

const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}))

const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

require('./src/auth/local')(passport)
require('./src/routes/users')(passport, app)

const movementAPI = require('./src/routes/movements')
app.use('/movementsAPI', movementAPI)

const ensureAuthenticated = require('./src/auth/ensureAuthenticated')
app.get('*', ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port',process.env.PORT)
})
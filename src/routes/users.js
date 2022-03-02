require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('../database/operations')
const router = require('express').Router

module.exports = (passport, app) => {

    app.post('/register', (req, res) => {
        const hash = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT))
        const data = {
            email: req.body.email,
            password: hash,
        }
        db.getUsersByEmail(data, (result) => {
            if (result.length == 0) {
                db.addUser(data, () => {
                    res.sendStatus(201)
                })
            } else {
                res.sendStatus(304)
            }
        })
    })
    
    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            res.redirect('/home')
    })

}


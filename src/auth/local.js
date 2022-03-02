const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../database/operations')

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        const data = {
            email: username,
        }
        db.getUsersByEmail(data, (result) => {
            if (result.length == 0) {
                return done(null, false)
            }
            if (!bcrypt.compareSync(password, result[0].Password)) {
                return done(null, false)
            }
            const user = {
                userId: result[0].UserId,
                email: result[0].Email,
                password: result[0].Password,
            }
            return done(null, user)
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.userId)
    })

    passport.deserializeUser((id, done) => {
        const data = {
            userId: id,
        }
        db.getUsersById(data, (result) => {
            const user = {
                userId: result[0].UserId,
                email: result[0].Email,
                password: result[0].Password,
            }
            done(null, user)
        })
    })
}
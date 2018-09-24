import express from 'express'
import passport from 'passport'
import {
    r,
    dbConnx,
} from './db'
import {
    serverPort,
} from '../config'

// Serialize user into the sessions
passport.serializeUser((user, done) => { // happens after user is inserted into DB
    return done(null, user.id)
})

// Deserialize user from the sessions
passport.deserializeUser((id, done) => {
    r.table(tables.users)
        .get(id)
        .run(dbConnx)
        .then((user) => {
            return done(null, user)
        })
})

// Initialize http server
const app = express()

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Launch the server on the serverPort
const server = app.listen(serverPort, () => {
    const { address, port } = server.address()
    console.log(`Listening at http://${address}:${port}`)
})

export {
    app,
    passport,
    server,
}
require('./authRoutes')
require('./authStrategies')

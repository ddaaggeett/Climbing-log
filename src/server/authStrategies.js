import GitHubStrategy from 'passport-github'
import GoogleStrategy from 'passport-google-oauth20'
import {
    github,
    google,
    tables,
} from '../config'
import {
    passport,
} from '.'
import {
    r,
    dbConnx,
} from './db'

const loginCallbackHandler = function (objectMapper, type) {
    return function (accessToken, refreshToken, profile, done) {
        var newUserInst = objectMapper(profile)
        if (accessToken !== null) {
            r.table(tables.users)
                .getAll(newUserInst.username, { index: 'username' }) // TODO: or 'email' - whichever secondary index is decided to be unique per user
                .filter({ type: type })
                .run(dbConnx)
                .then(function (cursor) {
                    return cursor.toArray()
                        .then(function (users) {
                            if (users.length > 0) { // if user already exists
                                return done(null, users[0])
                            }
                            return r.table(tables.users) // if user doesn't exist yet
                                .insert(newUserInst)
                                .run(dbConnx)
                                .then(function (response) {
                                    return r.table(tables.users)
                                        .get(response.generated_keys[0])
                                        .run(dbConnx)
                                })
                                .then(function (newUser) {
                                    done(null, newUser)
                                })
                        })
                })
                .catch(function (err) {
                    console.log('Error Getting User', err)
                })
        }
    }
}

passport.use(new GitHubStrategy(
    github,
    loginCallbackHandler(function (profile) {
        return {
            'username': profile.username,
            'name': profile.displayName || null,
            'url': profile.profileUrl,
            'avatar': profile._json.avatar_url,
            'type': profile.provider
        }
    }, 'github')
))

passport.use(new GoogleStrategy(
    google,
    loginCallbackHandler(function (profile) {
        console.log(JSON.stringify(profile,null,2))
        return {
            'username': profile._json.nickname,
            'name': profile.displayName || null,
            'url': profile._json.url,
            'avatar': profile._json.image.url,
            'type': profile.provider
        }
    }, 'google')
))

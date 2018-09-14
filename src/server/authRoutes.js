import {
    app,
    passport,
} from '.'

app.get('/auth/github', passport.authenticate('github'))
app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => {
        res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user))
    }
)

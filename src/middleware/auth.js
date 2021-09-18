module.exports.Authenticate = (req, res, next) => {
    if (validateUser(req.body.username, req.body.password)) {
        next()
    } else {
        res.sendStatus(401)
    }
}


module.exports.Authorize = (req, res, next) => {
    if (validatePermission(req.session)) {
        next()
    } else {
        res.sendStatus(403) // unauthorized
    }
}

module.exports.Login = (req, res) => {
    req.session.loggedIn = true
    req.session.username = res.locals.username
    console.log(req.session)
    res.send("hello there")
}

module.exports.Logout = (req, res) => {
    req.session.destroy((err) => {})
    res.send("hello there")
}

function validateUser(username, password) {
    return true
}

function validatePermission(session) {
    return session.loggedIn
}
module.exports.Authenticate = async (req, res) => {
    if (req.session.loggedIn) {
        // just refresh it
        req.session.regenerate(function(err) {
            console.log(err)
        })
        return
    }

    const [userId, err] = await validateUser(req.body.username, req.body.password)
    if (!err) {
        req.session.loggedIn = true
        req.session.username = userId
        res.sendStatus(200)
    } else {
        console.log(err)
        res.sendStatus(401)
    }
}

module.exports.Authorize = async (req, res, next) => {
    const isAllowed = await validatePermission(req.session)
    if (isAllowed) {
        next()
    } else {
        res.sendStatus(403) // unauthorized
    }
}

module.exports.Logout = (req, res) => {
    req.session.destroy((err) => {})
    res.send("hello there")
}

// returns a userId followed by error
async function validateUser(username, password) {
    return ["hellothere", null]
}

async function validatePermission(session) {
    return session.loggedIn
}
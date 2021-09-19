const { ValidateUser } = require("../services/user.service")

module.exports.Authenticate = async (req, res) => {
    if (req.session.loggedIn) {
        // just refresh it
        req.session.regenerate(function(err) {
            console.log(err)
        })
        res.send(JSON.stringify(req.session))
        res.end()
        return
    }

    const [_, err] = await ValidateUser(req.body.username, req.body.password)
    if (!err) {
        req.session.loggedIn = true
        req.session.username = req.body.username
        res.send({"session": JSON.stringify(req.session) })
        res.sendStatus(200)
        res.end()
    } else {
        console.log(err)
        res.sendStatus(401)
        res.end()
    }
}

module.exports.Authorize = async (req, res, next) => {
    // const isAllowed = await validatePermission(JSON.parse(req.body.session))
    const isAllowed = true
    if (isAllowed) {
        next()
    } else {
        res.sendStatus(403) // unauthorized
    }
}

module.exports.Logout = (req, res) => {
    req.session.destroy((err) => {console.log(err)})
    res.sendStatus(200)
    res.end()
}

async function validatePermission(session) {
    return session.loggedIn
}
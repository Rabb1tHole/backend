const { getUserByUsername, dbRegisterUser } = require("./db.service")
const bcrypt = require("bcryptjs")

module.exports.CreateUser = async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));
    const [err, sessionId] = await dbRegisterUser(username, hashedPassword)
    if (err) {
        console.log(err)
        res.sendStatus(400)
        return
    }
    res.sendStatus(200)
}

// returns a userId followed by error
module.exports.ValidateUser = async (username, password) => {
    const [err, userRow] = await getUserByUsername(username);
    if (err) {
        return [null, err]
    }

    if (userRow.length == 0) {
        return [null, new Error("User could not be found")]
    }

    const validated = await bcrypt.compare(password, userRow[0].password);
    if (!validated) {
        return [null, new Error("passwords did not match")]
    }

    return [userRow[0].id, null]
}

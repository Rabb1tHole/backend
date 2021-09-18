const {Client} = require("pg");

const postgresClient = new Client({
    connectionString: process.env.POSTGRES_CONNECTION_STRING
})

module.exports.postgresConnect = async () => {
    console.log(process.env.POSTGRES_CONNECTION_STRING)
    return postgresClient.connect()
        .then(() => console.log("connected to psql"))
        .catch(err => console.error(err))
}

module.exports.dbRegisterUser = async(username, password) => 
    postgresClient.query(
        'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id',
        [username, password]
    )
    .then((res) => [null, res.rows[0].id])
    .catch(err => [err, null])

module.exports.getUserByUsername = async (username) =>
    postgresClient.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    )
    .then((res) => [null, res.rows])
    .catch(err => [err, null])

// promise that just returns an error
module.exports.dbSaveGraph = async(userId, nodeList) => 
    //Save graph to db here
    postgresClient.query(
        'INSERT INTO games(user_id, nodes) VALUES ($1, $2)',
        [userId, nodeList]
    )
    .then((res) => null)
    .catch((err) => err)

module.exports.dbGetGraph = async (userId, gameId) => 
    postgresClient.query(
        'SELECT nodes FROM games WHERE user_id = $1 AND id = $2',
        [userId, gameId]
    )
    .then((res) => [null,res.rows]) 
    .catch(err => [err,null])


const {Client} = require("pg");

const postgresClient = new Client({
    connectionString: process.env.POSTGRES_CONNECTION_STRING
})

module.exports.migrations = async () => { 
    let migrationsToDo = 
        `CREATE TABLE users (
            id serial primary key,
            username varchar(64) not null unique,
            password varchar(128) not null
        )`

    postgresClient.query(migrationsToDo).then(_ => null).catch(err => err)
}

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

module.exports.dbGetGraph = async () => 
    //save to database



const express = require('express');
const redis = require('redis')
const connectRedis = require('connect-redis')
const session = require('express-session');
const cors = require('cors');
const { postgresConnect, migrations } = require('./services/db.service');
const { Authenticate, Authorize } = require('./middleware/auth');

const main = async () => {
    // uses json and allows cors
    const app = express();
    app.use(express.json());
    app.use(cors());
    
    // session stuff
    const redisClient = redis.createClient('http://redis:6379');
    const RedisStore = connectRedis(session);
    app.use(session({
        secret: process.env.SESSION_SECRET,
        name: "rabbitHoleSession",
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000*60*60*24*7
        }
    }))

    // routes
    app.get('/', Authorize, (req, res) => 
        res.json({ message: 'Docker is easy 🐳' }) 
    );

    app.get('/auth', Authenticate)

    // execution of app
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );

    // initialize the postgres connection
    postgresConnect()
}

main();
const app = require('express')();
const redis = require('redis')

const getRedisClient = () => redis.createClient('http://redis:6379');

app.get('/', (req, res ) => 
    res.json({ message: 'Docker is easy 🐳' }) 
);

app.post('/test', async (req, res) => {
    let redisClient = getRedisClient()
    await redisClient.RPUSH("test", "hello")
    res.json({message: "hello"})
});

app.get('/test', (req, res) => {
    let redisClient = getRedisClient()
    redisClient.lRange("test").then((value) => {
        if (value) {
            value.forEach((string) => console.log(string))
        }
    })
    res.json({message: "hello"})
})

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );
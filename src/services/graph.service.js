const { dbGetGraph, dbSaveGraph, dbGetCount, getUserByUsername, dbGetAllGraph } = require("./db.service");

// nodeList = [
//   {URL, timespent, list of adjacent nodes (ID), node ID},
//   {},
//]
module.exports.getGraphById = async (req, res) => {
    const gameId = req.params.gameId
    console.log(gameId)
    const [err, user] = await getUserByUsername(req.session.username)
    if (err) {
        res.sendStatus(400);
        res.end()
        return
    }

    const [err2, graph] = await dbGetGraph(user[0].id, gameId);
    if (err2) {
        res.sendStatus(400)
        res.end()
        return
    }
    
    res.send(graph); // send graph 
}

module.exports.getAllGames = async (req, res) => {
    const [err, user] = await getUserByUsername(req.session.username)
    if (err) {
        res.sendStatus(400)
        res.end()
        return
    }

    const [err2, games] = await dbGetAllGraph(user[0].id);
    if (err2) {
        console.log(err)
        res.sendStatus(400);
        res.end();
        return
    }
    console.log(games)
    res.send(games);
}

module.exports.makeGraph = async (req, res) => {
    const nodeList = req.body.nodeList;
    console.log(req.session)
    let [err, user] = await getUserByUsername(req.session.username)
    if (err) {
        console.log(err)
        res.sendStatus(400);
        res.end()
        return
    }

    console.log(user)

    // todo: 
    // {
        // URL: <url>, timespent: <time-spent>, Node-id: <id>
    // }

    err = await dbSaveGraph(user[0].id, nodeList)
    if (err) {
        console.log(err)
        res.sendStatus(400);
        res.end();
        return
    }

    res.sendStatus(200);
    res.end();
};
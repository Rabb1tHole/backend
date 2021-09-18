const { dbGetGraph, dbSaveGraph } = require("./db.service");

// nodeList = [
//   {URL, timespent, list of adjacent nodes (ID), node ID},
//   {},
//]
module.exports.getGraphById = async (req, res) => {
    const gameId = req.params.gameId
    const user = getUserByUsername(req.session.username)
    const graph = dbGetGraph(user.id, gameId);
    
    res.send(graph); // send graph 
}

module.exports.countGames = async (req, res) => {

}

module.exports.makeGraph = async (req, res) => {
    const nodeList = req.body.nodeList;
    const user = getUserByUsername(req.session.username)

    // todo: 
    // {
    // URL: <url>, timespent: <time-spent>, Node-id: <id>
    // }

    dbSaveGraph(user.id, nodeList)
    res.sendStatus(200);
    res.end();
};
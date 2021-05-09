const { decrementPlayers } = require("../model/game.model");

module.exports = (app) => {
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    const statistics = require("../controllers/statistics.controller");
    const profil = require("../controllers/profil.controller");
    const game = require("../controllers/game.controller");

    app.post("/table", game.createTable);
    app.post("/spool", game.putInPool);
    app.post("/icount", game.incrementPlayers);
    app.post("/dcount", game.decrementPlayers);
    app.post("/sign", signin.createUser);
    app.post("/guest", signin.createGuest);
    

    app.get("/history/:userId", history.getHistory);
    app.get("/statistics/:pseudo", statistics.getStatistics);
    app.get("/profil/:pseudo", profil.getProfil);

    
    app.get("/pot/:gameId", game.getPot);
    app.get("/potd/:gameId", game.delPot);
    app.get("/pots/:gameId/:card", game.setOnePot);
    app.get("/deck/:gameId/:userId", game.getDeck);
    app.get("/dcard/:gameId/:user/:card", game.delCard);
    app.get("/pool", game.getPool);
    app.get("/code/:gameId", game.getCode);
    app.get("/ccount/:gameId/:userId", game.getCardsCount);
    
    app.delete("/poold", game.deletePool);
};
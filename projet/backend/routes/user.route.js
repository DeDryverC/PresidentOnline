const { decrementPlayers } = require("../model/game.model");

module.exports = (app) => {
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    const statistics = require("../controllers/statistics.controller");
    const profil = require("../controllers/profil.controller");
    const game = require("../controllers/game.controller");
    const login = require("../controllers/login.controller")

    app.post("/table", game.createTable);
    app.post("/lobby", game.createLobby);
    app.post("/spool", game.putInPool);
    app.post("/icount", game.incrementPlayersPool);
    app.post("/dcount", game.decrementPlayersPool);
    app.post("/sign", signin.createUser);
    app.post("/guest", signin.createGuest);
    app.post("/lobbyp", game.putPlayerLobby);
    app.delete("/lobbyr", game.removePlayerLobby);
    app.post("/toggle", game.togglePlayerLobby);
    app.delete("/delete", game.deleteGame);

    app.get("/history/:userId", history.getHistory);
    app.get("/statistics/:pseudo", statistics.getStatistics);
    app.get("/profil/:pseudo", profil.getProfil);
    app.get("/login/:mail", login.login)
    app.get("/loginall", login.findAllUsers)
    app.get("/token/:gameId/:pseudo", game.getPlayerToken);
    app.get("/lobby/:gameId", game.getLobby);
    //app.get("/loginOne/:mail", login.findPasswordUser)

    
    app.get("/pot/:gameId", game.getPot);
    app.get("/potd/:gameId", game.delPot);
    app.get("/pots/:gameId/:card", game.setOnePot);
    app.get("/ndeck/:gameId", game.setDeck);
    app.get("/deck/:gameId/:userId", game.getDeck);
    app.get("/icard/:gameId/:user/:card", game.addCard);
    app.get("/dcard/:gameId/:user/:card", game.delCard);
    app.get("/pool", game.getPool);
    app.get("/code/:gameId", game.getCode);
    app.get("/ccount/:gameId/:userId", game.getCardsCount);
    app.get("/game/:code", game.getGameId);
    
    
    app.delete("/poold", game.deletePool);
};
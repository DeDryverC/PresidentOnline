module.exports = (app) => {
    const rules = require("../controllers/rules.controller");
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    const statistics = require("../controllers/statistics.controller");
    const profil = require("../controllers/profil.controller");
    const game = require("../controllers/game.controller");

    app.get("/getRules", rules.getRules);
    app.get("/getHistory/:userId", history.getHistory);
    app.get("/getStatistics/:pseudo", statistics.getStatistics);
    app.get("/getProfil/:pseudo", profil.getProfil);

    app.get("/getPot/:gameId", game.getPot);
    app.get("/delPot/:gameId", game.delPot);
    app.get("/setOnePot/:gameId/:card", game.setOnePot);

    app.get("/delCard/:gameId/:user/:card", game.delCard);
    app.post("/postSign", signin.createUser1);
};

module.exports = (app) => {
    const rules = require("../controllers/rules.controller");
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    const statistics = require("../controllers/statistics.controller");
    const profil = require("../controllers/profil.controller");

    app.get("/getRules", rules.getRules);
    app.get("/getHistory/:userId", history.getHistory);
    app.get("/getStatistics/:pseudo", statistics.getStatistics);
    app.get("/getProfil/:pseudo", profil.getProfil);
    app.post("/postSign", signin.createUser)
};

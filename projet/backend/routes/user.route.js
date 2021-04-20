module.exports = (app) => {
    const rules = require("../controllers/rules.controller");
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    const statistics = require("../controllers/statistics.controller");

    app.get("/getRules", rules.getRules);
    app.get("/getHistory", history.getHistory);
    app.get("/getStatistics/:pseudo", statistics.getStatistics);

};

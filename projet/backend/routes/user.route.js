module.exports = (app) => {
    const rules = require("../controllers/rules.controller");
    const history = require("../controllers/history.controller")
    
    app.get("/getRules", rules.getRules)
    app.get("/getHistory", history.getHistory)
};

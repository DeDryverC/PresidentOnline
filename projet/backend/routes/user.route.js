module.exports = (app) => {
    const rules = require("../controllers/rules.controller");
    const history = require("../controllers/history.controller");
    const signin = require ("../controllers/signin.controller");
    
    app.get("/getRules", rules.getRules)
    app.get("/getHistory", history.getHistory)
    app.post("/postSign", signin.createUser1)
};

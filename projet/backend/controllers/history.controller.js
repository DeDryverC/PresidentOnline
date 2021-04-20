const history = require('../model/history.model');
const mysql = require('../model/db');

exports.getHistory = (req, res) => {
    history.getHistory(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found player with pseudo ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving player with pseudo " + req.params.userId,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      };
    });
}
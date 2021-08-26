const statistics = require('../model/statistics.model');
const mysql = require('../model/db');


exports.getStatistics = (req, res) => {
    statistics.getStatistics(req.params.pseudo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found profil with pseudo ${req.params.pseudo}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving statistics with pseudo " + req.params.pseudo,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });
  };

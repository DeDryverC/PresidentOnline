const deleteP = require('../model/supprimer.model');
const mysql = require('../model/db');


exports.deleteProfile = (req, res) => {
    deleteP.deleteProfile(req.params.pseudo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Impossible to delete this profile : ${req.params.pseudo}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving this profile " + req.params.pseudo,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });
  };

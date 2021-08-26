const profil = require('../model/profil.model');
const mysql = require('../model/db');

exports.getProfil = (req, res) => {
    profil.getProfil(req.params.pseudo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found profil with pseudo ${req.params.pseudo}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving profil with pseudo " + req.params.pseudo,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*"); /* Mettre param pour limiter l'accès */
        res.send(data);
      }
    });
  };
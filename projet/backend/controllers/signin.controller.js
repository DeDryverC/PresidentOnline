const signin = require('../model/signin.model');
const mysql = require('../model/db');

exports.createUser1 = (req, res) => {
    const User={
        pseudo : req.body.pseudo,
        name : req.body.name,
        surname : req.body.surname,
        email : req.email,
        birthdate : req.birthDate,
        password : req.password,
        gameCount:req.gameCount,
    };
     signin.createUser2(User, (err, data) => {
        if (err) {
              res.status(500).send({
                message: "Error while sign in "
              });
            }
          else {
            res.header("Access-Control-Allow-Origin","*");
            res.send(data);
          }
      });
    }
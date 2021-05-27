const signin = require('../model/signin.model');
const mysql = require('../model/db');

exports.createUser = (req, res) => {

    const donneesUser={
        pseudo : req.body.pseudo,
        name : req.body.name,
        surname : req.body.surname,
        email : req.body.email,
        birthdate : req.body.birthDate,
        password : req.body.password,
        gameCount:req.body.gameCount,
       /* pseudo : 'AndreBalou',
        name : 'Andreas',
        surname : 'Martin',
        email : 'AndreMartin@gmail.com',
        birthdate : '22/09/1688',
        password : 'blabla',
        gameCount:'0',*/
    };

     signin.createUser(donneesUser, (err, data) => {
        if (err) {
              res.status(500).send({
                message: "Error while signing in "
              });
            }
          else {
            res.header("Access-Control-Allow-Origin","*");
            res.send(data);
          }
      });
    };

exports.createGuest = (req, res) => {
  signin.createGuest( (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error while creating guest"
      });
    }
    else {
      res.header("Access-Control-Allow-Origin","*");
      res.send(data);
    }
  });
};

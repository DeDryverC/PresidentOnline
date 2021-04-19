const signin = require('../model/signin.model');

exports.createUser = (req, res) => {
    const User={
        pseudo : req.body.pseudo,
        name : req.body.name,
        surname : req.body.surname,
        email : req.body.email,
        birthdate : req.body.birthDate,
        password : req.body.password,
    };
     signin.createUser1(User, (err, data) => {
        console.log(data)
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
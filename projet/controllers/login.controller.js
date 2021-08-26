const login = require("../model/login.model");

exports.login =(req,res) => {
    
    const log={
        mail: req.body.mail,
        password : req.body.password,
    }

    login.login(log,(err,data) =>{
        if(err)
        res.statut(500).send({
            message : err.message
        })

        else res.send(data)
    })
}


exports.findAllUsers = (req, res) => {
      login.findAllUsers( (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            });
          } else {
            res.status(500).send({
              
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });
  
    };


exports.findPseudoGuest = (req, res) => {
      login.findPseudoGuest( (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            });
          } else {
            res.status(500).send({
              
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });
  
    };
/*exports.findPasswordUser = (req, res) => {
    login.findPasswordUser( (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
          });
        } else {
          res.status(500).send({
            
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });

  };*/
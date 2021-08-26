const sql = require("./db");
const login = function () {
   
  };

  login.findAllUsers=(result) => {
    sql.query('SELECT * from joueurs', (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },

  login.findPseudoGuest=(result) => {
    sql.query('SELECT * FROM joueurs ORDER BY Id DESC LIMIT 1;', (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },

  /*login.findPasswordUser=(log, result) => {
    sql.query('SELECT Password from joueurs where Email = "'+log.mail+'"', (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
            }
            console.log("donnees :" , res);
            result (null, res);
    })
  },*/


 /* 
  login.connection = (log, result) => {
      console.log(log.mail);
      let sql= 'SELECT * from joueurs where Email = "'+log.mail+'"';
      sql.query(sql, function(err,res){
      if(res==undefined || res[0] == undefined){
          alert('mail error')
      }
      else{
          var bcrypt=require('bcryptjs');
          bcrypt.compare(log.password, res[0].password, function(err,ret){
              if(ret){
                  alert('entrée dans l appli sous le mail' + res[0].mail)
              }
              else{
                  alert('impossible to log in')
              }
          })
    }
      })
  }*/

  module.exports = login;
const mysql = require("./db");

const profil = function(user){
    this.id = profil.id
}

profil.getProfil = (pseudo, result) => {
    mysql.query(`select Id, Pseudo, Name, Surname, Email, Birthdate, Password, GameCount from joueurs where joueurs.pseudo="${pseudo}";`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("contacts :", res);
        result(null,res);
    });
};


module.exports = profil;


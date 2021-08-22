const mysql = require("./db");

const deleteP = function(user){
    this.id = deleteP.id
}

deleteP.deleteProfile = (pseudo, result) => {
    mysql.query(`delete from joueurs where joueurs.pseudo="${pseudo}";`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("contacts :", res);
        result(null,res);
    });
};



module.exports = deleteP;
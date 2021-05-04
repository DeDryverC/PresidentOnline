const mysql = require("./db");

const statistics = function(user){
    this.id = statistics.id
}

statistics.getStatistics = (pseudo, result) => {
    mysql.query(`select userHistory.GameId, joueurs.Pseudo, userHistory.Position from userHistory, joueurs where userHistory.UserId = joueurs.Id and joueurs.pseudo="${pseudo}";`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("contacts :", res);
        result(null,res);
    });
};


module.exports = statistics;


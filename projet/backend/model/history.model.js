const mysql = require("./db");

const statistics = function(user){
    this.id = statistics.id
}

statistics.getHistory = (userId, result) => {
    mysql.query(`select GameId, UserId, Position, Date from userHistory where UserId="${userId}";`, (err, res) =>{
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
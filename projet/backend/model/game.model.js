const mysql = require("./db");

const game = function(user){
    this.id = game.id;
}

game.getPot = (gameId, result) => {
    mysql.query(`select * from ${gameId} where user="pot";`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

game.delPot = (gameId, result) => {
    mysql.query(`delete from ${gameId} where user='pot';`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, "Pot deleted");
    });
};

game.setOnePot = (gameId, card, result) => {
    mysql.query(`INSERT INTO ${gameId} (user, card) VALUES ('pot', ${card});`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

game.delCard = (gameId, user, card, result) => {
    mysql.query(`delete from ${gameId} where user=${user} and card=${card}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


module.exports = game;
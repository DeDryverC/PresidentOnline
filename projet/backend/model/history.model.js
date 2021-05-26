const mysql = require("./db");

const history = function (user) {
    this.id = history.id
}

history.getHistory = (userId, result) => {
    mysql.query(`select GameId, UserId, Position from userHistory where UserId="${userId}";`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("res: ", res);
        result(null, res);
    });
};

history.setGameInHistory = (gameId, userId, position, result) => {
    let date = new Date();
    date = date.getDate() +"/"+ (date.getMonth()+1) +"/"+date.getFullYear();
    mysql.query(`INSERT INTO userHistory (GameId, UserId, Position, Date) VALUES ("${gameId}", "${userId}",${position} , "${date}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("res: ", res);
        result(null, res);
    })
}

module.exports = history;
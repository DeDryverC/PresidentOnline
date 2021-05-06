const mysql = require("./db");

const game = function(user){
    this.id = game.id;
}

game.createTable = (gameId, result) => {
    console.log("reached model");
    mysql.query(`CREATE TABLE ${gameId} (user VARCHAR(45) NOT NULL, card VARCHAR(45) NOT NULL);`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
    
}

game.setCode = (gameId, code, result) => {
    mysql.query(`INSERT INTO ${gameId} (user, card) VALUES ('code', ${code});`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
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


game.setDeck = (gameId, players, result) => {
    let shuffledDeck = Array.from({length: 52}, (v, k) => k+1);
    shuffledDeck = shuffledDeck.sort((a, b) => 0.5 - Math.random());

    let pDecks = [];
    for(let x=0; x<players.length; x++){
        pDecks.push([]);
    }
    


    mysql.query(``, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


game.getDeck = (gameId, userId, result) =>{
    mysql.query(`select * from ${gameId} where user=${userId}`, (err,res) => {
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
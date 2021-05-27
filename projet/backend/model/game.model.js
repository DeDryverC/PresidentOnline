const mysql = require("./db");

const game = function (user) {
    this.id = game.id;
}

game.createTable = (gameId, result) => {
    console.log("reached model");
    mysql.query(`CREATE TABLE ${gameId} (user VARCHAR(45) NOT NULL, card VARCHAR(45) NOT NULL);`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });

}

game.createLobby = (gameId, result) => {
    console.log("reached model");
    let lobby = gameId + "Lobby";
    mysql.query(`CREATE TABLE ${lobby} (user VARCHAR(45) NOT NULL, token BOOLEAN NOT NULL);`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });

}

game.getGameId = (code, result) => {
    mysql.query(`SELECT gameId from GamePool where code = "${code}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("model res: ", res);
        result(null, res);
    });
}

game.putInPool = (gameId, maxPlayers, result) => {

    let code = Math.random().toString(36).substring(7).toUpperCase();
    mysql.query(`INSERT INTO GamePool (gameId, code, currPlayers, maxPlayers) VALUES ("${gameId}", "${code}", 0, ${maxPlayers});`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.getPool = (result) => {
    mysql.query(`SELECT * from GamePool`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.deletePool = (gameId, result) => {
    mysql.query(`DELETE from GamePool where gameId='${gameId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.incrementPlayersPool = (gameId, result) => {
    mysql.query(`UPDATE GamePool SET currPlayers = (currPlayers + 1) WHERE gameId = "${gameId}";`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.decrementPlayersPool = (gameId, result) => {
    mysql.query(`UPDATE GamePool SET currPlayers = (currPlayers - 1) WHERE gameId = "${gameId}";`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.getLobby = (gameId, result) => {
    let lobby = gameId + "Lobby";
    mysql.query(`SELECT * FROM ${lobby}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
}

game.putPlayerLobby = (gameId, pseudo, token, result) => {
    let lobby = gameId + "Lobby";
    mysql.query(`INSERT INTO ${lobby} (user, token) VALUES ("${pseudo}", "${token}");`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.removePlayerLobby = (gameId, pseudo, result) => {
    let lobby = gameId + "Lobby";
    mysql.query(`DELETE FROM ${lobby} where user='${pseudo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.getPlayerToken = (gameId, pseudo, result) => {
    let lobby = gameId + "Lobby";
    mysql.query(`SELECT token from ${lobby} where user='${pseudo}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.togglePlayerLobby = (gameId, pseudo, result) => {
    let lobby = gameId + "Lobby";
    mysql.query(`UPDATE ${lobby} SET token = IF (token, 0, 1) WHERE user = ${pseudo}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.getCode = (gameId, result) => {
    mysql.query(`select code from GamePool where gameId="${gameId}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
}

game.getPot = (gameId, result) => {
    mysql.query(`select * from ${gameId} where user="pot";`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

game.delPot = (gameId, result) => {
    mysql.query(`delete from ${gameId} where user='pot';`, (err, res) => {
        if (err) {
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
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

game.addCard = (gameId, user, card, result) => {
    mysql.query(`INSERT INTO ${gameId} (user, card) VALUES ('${user}', ${card});`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


game.delCard = (gameId, user, card, result) => {
    mysql.query(`delete from ${gameId} where user='${user}' and card=${card}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


game.setDeck = (gameId, players, result) => {
    let shuffledDeck = Array.from({ length: 52 }, (v, k) => k + 1);
    shuffledDeck = shuffledDeck.sort((a, b) => 0.5 - Math.random());

    let pDecks = [];
    for (let x = 0; x < players.length; x++) {
        pDecks.push([]);
    }



    mysql.query(``, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};


game.getDeck = (gameId, userId, result) => {
    mysql.query(`select * from ${gameId} where user='${userId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

game.getCardsCount = (gameId, userId, result) => {
    mysql.query(`select user, count(distinct card) as Ncards from ${gameId} where user != '${userId}' and user !='pot' group by user`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
}


game.deleteGame = (gameId, result) => {
    mysql.query(`DROP TABLE ${gameId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
}

game.distribDeck = (gameId, lobby, result) => {
    let shuffledDeck = Array.from({ length: 52 }, (v, k) => k + 1);
    shuffledDeck = shuffledDeck.sort((a, b) => 0.5 - Math.random());
    let arrayJoueurs = []
    for (let i = 0; i < lobby.length; i++) {
        arrayJoueurs.push([])
    }
    for (let i = 0; i < parseInt(52 / lobby.length); i++) {
        for (let y = 0; y < arrayJoueurs.length; y++) {
            arrayJoueurs[y].push(shuffledDeck[shuffledDeck.length - 1]);
            shuffledDeck.pop();
        }

    }
    let requete = `INSERT INTO ${gameId} (user, card) VALUES `
    for (let i = 0; i < arrayJoueurs.length; i++) {
        for (let y in arrayJoueurs[i]) {
            if (arrayJoueurs[i][y] == arrayJoueurs[arrayJoueurs.length - 1][arrayJoueurs[i].length - 1]) {
                requete = requete + "('" + lobby[i].user + "'," + arrayJoueurs[i][y] + ");";
            }
            else {
                requete = requete + "('" + lobby[i].user + "'," + arrayJoueurs[i][y] + "),";
            }
        }

    }
    console.log(requete)
    mysql.query(requete, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("pot :", res);
        result(null, res);
    });

}

game.exist = (gameId, result) => {
    mysql.query(`SELECT COUNT(*) as bool FROM information_schema.tables WHERE table_schema = 'president_online' and table_name = '${gameId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
}

module.exports = game;
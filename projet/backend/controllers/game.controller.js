const game = require('../model/game.model');
const mysql = require('../model/db');


exports.createTable = (req, res) => {

  const gameInfo = {
    gameId: req.body.gameId
  };

  game.createTable(gameInfo.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `invalid input, object invalid.`,
        });
      } else {
        res.status(409).send({
          message: "an existing item already exists "
        });
      }
    }
  });
}

<<<<<<< HEAD


exports.createLobby = (req, res) =>{
    
=======
exports.createLobby = (req, res) => {

>>>>>>> 0c67efb2a2154471ba682e8bcbc1c387aa0ff99a
  const gameInfo = {
    gameId: req.body.gameId
  };

  game.createLobby(gameInfo.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId.`,
        });
      } else {
        res.status(500).send({
          message: "Error creating lobby with gameId"
        });
      }
    }
  });
}

exports.getGameId = (req, res) => {
  game.getGameId(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with that gameCode.`,
        });
      } else {
        res.status(500).send({
          message: "Error fetching gameId with that code "
        });
      }


    }
    else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.putInPool = (req, res) => {

  const gameInfo = {
    gameId: req.body.gameId,
    maxPlayers: req.body.maxPlayers
  };

  game.putInPool(gameInfo.gameId, gameInfo.maxPlayers, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool.`,
        });
      } else {
        res.status(500).send({
          message: "Error putting in pool ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.getPool = (req, res) => {
  game.getPool((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting pool ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.deletePool = (req, res) => {
  game.deletePool(req.body.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool.`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting pool ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.incrementPlayersPool = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
  };

  game.incrementPlayersPool(gameInfo.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool.`,
        });
      } else {
        res.status(500).send({
          message: "Error incrementing players count ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.decrementPlayersPool = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
  };

  game.decrementPlayersPool(gameInfo.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool.`,
        });
      } else {
        res.status(500).send({
          message: "Error decrementing players count ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}


exports.getLobby = (req, res) => {
  game.getLobby(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lobby.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting lobby",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
}

exports.putPlayerLobby = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
    pseudo: req.body.pseudo,
    token: req.body.token,
  };

  game.putPlayerLobby(gameInfo.gameId, gameInfo.pseudo, gameInfo.token, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lobby.`,
        });
      } else {
        res.status(500).send({
          message: "Error putting player in lobby ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}


exports.removePlayerLobby = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
    pseudo: req.body.pseudo,
  };

  game.removePlayerLobby(gameInfo.gameId, gameInfo.pseudo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lobby.`,
        });
      } else {
        res.status(500).send({
          message: "Error removing player from lobby ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}



exports.getPlayerToken = (req, res) => {
  game.getPlayerToken(req.params.gameId, req.params.pseudo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lobby.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting token",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
}




exports.togglePlayerLobby = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
    pseudo: req.body.pseudo,
  };

  game.togglePlayerLobby(gameInfo.gameId, gameInfo.pseudo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lobby.`,
        });
      } else {
        res.status(500).send({
          message: "Error toggling token in lobby ",
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.getCode = (req, res) => {
  game.getCode(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving code with gameId " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}


exports.getPot = (req, res) => {
  game.getPot(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pot in ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving pot with gameId " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
}

exports.delPot = (req, res) => {
  game.delPot(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting pot in" + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.setOnePot = (req, res) => {
  game.setOnePot(req.params.gameId, req.params.card, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error setting in pot in " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.addCard = (req, res) => {
  game.addCard(req.params.gameId, req.params.user, req.params.card, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error inserting card in " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.delCard = (req, res) => {
  game.delCard(req.params.gameId, req.params.user, req.params.card, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting card in " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.setDeck = (req, res) => {
  game.setDeck(req.params.gameId, req.params.players, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error setting decks in " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
}

exports.getDeck = (req, res) => {
  game.getDeck(req.params.gameId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting deck from " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};


exports.getCardsCount = (req, res) => {
  game.getCardsCount(req.params.gameId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting deck from " + req.params.gameId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.deleteGame = (req, res) => {
  game.deleteGame(req.body.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pool`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting game"
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
}

<<<<<<< HEAD
=======

>>>>>>> 0c67efb2a2154471ba682e8bcbc1c387aa0ff99a
exports.distribDeck = (req, res) => {

  const gameInfo = {
    gameId: req.body.gameId,
    lobby: req.body.lobby,
  };
  game.distribDeck(gameInfo.gameId, gameInfo.lobby, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Can't distribute cards for the game : ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error distributing game"
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
<<<<<<< HEAD
=======
}


exports.exist = (req, res) => {
  game.exist(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with gameId ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error fetching game existence"
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  })
>>>>>>> 0c67efb2a2154471ba682e8bcbc1c387aa0ff99a
}
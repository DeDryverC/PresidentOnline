const game = require('../model/game.model');
const mysql = require('../model/db');


exports.createTable = (req, res) =>{
    
    const gameInfo = {
      gameId: req.body.gameId
    };

    game.createTable(gameInfo.gameId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found game with gameId.`,
          });
        } else {
          res.status(500).send({
            message: "Error creating table with gameId "
          });
        }
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
  game.deletePool(gameId, (err, data) => {
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

exports.addPlayerCount = (req, res) => {
  const gameInfo = {
    gameId: req.body.gameId,
  };

  game.addPlayerCount(gameInfo.gameId, (err, data) => {
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

exports.delPot = (req, res) =>{
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

exports.setOnePot = (req, res) =>{
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


exports.delCard = (req, res) =>{
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
  game.setDeck(req.params.gameId, (err, data) =>{
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
  game.getDeck(req.params.gameId, req.params.userId, (err, data) =>{
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
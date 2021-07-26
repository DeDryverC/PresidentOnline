const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const path = require('path');

const PORT = process.env.PORT || 5000;
const CHAT_PORT = process.env.PORT || 5001
const GAME_PORT = process.env.PORT || 5002
const LOBBY_PORT = process.env.PORT || 5003


app.use(cors());
app.use(require("body-parser").json())

const routes = require("./routes/user.route")(app);

//HEROKU
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`the server is running on ${PORT}`);
});




/********** GAME SOCKET**********/

const socketio = require('socket.io')
const http = require('http');
const { response } = require('express');
const { cpuUsage } = require('process');
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  socket.emit('connection', socket.id)


  socket.on('join_game', function (data) {
    const game_id = data.gid
    const user = data.user

    socket.leaveAll();
    socket.join(game_id)
    socket.channel = game_id
    socket.user = user
    console.log(`Player ${user} connected to ${game_id} .`)
    fetch(`http://localhost:5000/deck/${game_id}/${user}`)
      .then(response => response.json())
      .then(json => { socket.emit('userCard', json) })

    fetch(`http://localhost:5000/ccount/${game_id}/${user}`)

      .then(response => response.json())
      .then(json => { socket.emit('othersCount', json) })

    fetch(`http://localhost:5000/pot/${game_id}`)
      .then(response => response.json())
      .then(json => { socket.emit('cardsPot', json) })
  })

  socket.on('chgpile', (data) => {
    const game_id = data.gid
    const newCards = data.newcds
    let newpile = [];
    fetch(`http://localhost:5000/potd/${game_id}`)
    newCards.map((value, key) => {
      const fetchmsg = `http://localhost:5000/pots/${game_id}/` + String(value)
      newpile.push(value)
      console.log(fetchmsg)
      fetch(fetchmsg)
    })
    socket.in(socket.channel).emit('newpile', newpile)

  })
  socket.on('delcard', (data) => {
    const game_id = data.gid;
    const user = data.us;
    const selCard = data.sc;
    const userCard = data.usc;
    for (let i = 0; i < selCard.length; i++) {
      const index = userCard.indexOf(selCard[i])
      fetch(`http://localhost:5000/dcard/${game_id}/${user}/` + String(selCard[i]))
      userCard.splice(index, 1)
    }
    socket.emit('delcardReturn', userCard)
  })
  socket.on('finishTurn', (data) => {
    console.log('==========')
    console.log(`${data}`)
    console.log('==========')
    socket.to(socket.channel).emit('userPlayed', data)
  })
  socket.on('startPlaying', (data) => {
    socket.to(socket.channel).emit('gameStarted', data.id)
  })
  socket.on('disconnect', () => {
    console.log(`${socket.user} disconnected`)
    socket.emit('playerdeconnexion', { user: socket.user })
  })
})

server.listen(GAME_PORT, () => {
  console.log(`Game socket listening on port ${GAME_PORT}`)
})




/********** LOBBY SOCKET**********/

const serverLobby = http.createServer(app)
const ioLobby = socketio(serverLobby)

ioLobby.on('connection', (socket) => {
  socket.emit('connection',)
  socket.on('repconnection', (data) => {
    socket.user = data.user;
    //socket.gameId = data.gid;
    //socket.leaveAll();
    //socket.join(socket.gameId)
    //socket.channel = data.gid
    console.log(`${socket.user} connected in home`)
  })

  socket.on('createLobby', (data) => {
    const gameId = data.gid;
    const maxPlayer = data.mpv

    try {
      //creating table for the game
      fetch('http://localhost:5000/table', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
        }),

      })

      //setting the game in the game pool
      fetch('http://localhost:5000/spool', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
          maxPlayers: maxPlayer,
        }),
      })

      //creates lobby for the game
      fetch('http://localhost:5000/lobby', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      })

      //increments player count in gamepool
      fetch('http://localhost:5000/icount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
        })

      });
      socket.emit('lobbyCreated', { gid: gameId })
    }
    catch (error) {
      socket.emit('errorCreateLobby', error)
    }
  })
  socket.on('repGameCreated', async (data) => {
    socket.gameId = data.gid;
    socket.channel = data.gid;
    socket.user = data.user;
    socket.token = data.token;



    //Ajoute qqun dans le lobby
    try {
      await fetch('http://localhost:5000/lobbyp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: socket.gameId,
          pseudo: socket.user,
          token: socket.token,
        })
      })
        .then(response => response.json())
        .then(json => {
        })

      //fdonne info du lobby
      await fetch(`http://localhost:5000/lobby/${socket.gameId}`)
        .then(response => response.json())
        .then(json => {
          const yes = json
          console.log('yes ++++')
          console.log(yes)
          console.log('yes  ----')
          socket.emit('ownerInfoLobby', json);
        })

      fetch('http://localhost:5000/pool')
        .then(response => response.json())
        .then(json => {
          socket.broadcast.emit('createLobby', json)
        })

      socket.leaveAll();
      socket.join(socket.gameId)
      console.log(`${socket.user} a créer le lobby ${socket.gameId}`)
    }
    catch (error) {
      console.log('===================================')
      console.log('==========TRYCATCH ERROR===========')
      console.log('===================================')
      console.log(error)
      socket.emit('errorRepCreateGame', error)
    }
  })


  socket.on('launchGame', (data) => {
    socket.to(socket.channel).emit('joinGame', data)
  })

  socket.on('changeowner', (data) => {

  })
  socket.on('createTable', (data) => {
    //pool update
  })

  socket.on('playerLeaving', async (data) => {
    const user = data.user;
    const gameId = data.gid
    try {
      await fetch('http://localhost:5000/lobbyr', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
          pseudo: user,
        })
      });

      await fetch('http://localhost:5000/dcount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
        })
      });

      fetch(`http://localhost:5000/lobby/${gameId}`)
        .then(response => response.json())
        .then(json => {
          socket.to(socket.gameId).emit('chanPlayerLeaving', json)
        })
      socket.leaveAll()
      socket.channel = undefined
    }
    catch (error) {
      console.log('===================================')
      console.log('==========TRYCATCH ERROR===========')
      console.log('===================================')
      console.log(error)
    }

  })

  socket.on('ownerLeaving', async (data) => {
    const gameId = data.gid

    try {
      fetch('http://localhost:5000/poold', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: (gameId),
        })
      })

      // delete la table game selon gameId
      fetch('http://localhost:5000/delete', {
        method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', "Acces-Control-Allow-Origin": "true" },
        body: JSON.stringify({ gameId: gameId, })
      })

      // delete la table lobby selon gameId
      fetch('http://localhost:5000/delete', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: (gameId + "Lobby"),
        })
      })

      // Enleve la game du pool

      let clJson
      await fetch('http://localhost:5000/pool')
        .then(response => response.json())
        .then(json => {
          clJson = json
        })
      await fetch('http://localhost:5000/pool')
        .then(response => response.json())
        .then(json => {
          clJson = json
        })
      await fetch('http://localhost:5000/pool')
        .then(response => response.json())
        .then(json => {
          clJson = json
        })
      socket.broadcast.emit('closeLobby', clJson)
      socket.leaveAll()
      socket.channel = undefined
      console.log(`${socket.user} a fermé le lobby ${socket.gameId}`)
    }
    catch (error) {
      console.log('===================================')
      console.log('==========TRYCATCH ERROR===========')
      console.log('===================================')
      console.log(error)
    }
  })

  socket.on('playerJoin', async (data) => {

    const gameId = data.gid
    const user = data.user
    const token = data.token
    socket.gameId = data.gid;
    socket.channel = data.gid;
    socket.user = data.user;
    socket.token = data.token;

    socket.leaveAll();
    socket.join(socket.gameId)
    try {
      await fetch('http://localhost:5000/lobbyp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
          pseudo: user,
          token: 0,
        })
      });
      await fetch('http://localhost:5000/icount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
          gameId: gameId,
        })
      });
      await fetch(`http://localhost:5000/lobby/${gameId}`)
        .then(response => response.json())
        .then(json => {
          const yes = json
          console.log('yes ++++')
          console.log(yes)
          console.log('yes  ----')
          socket.emit('repPlayerJoin', json);
          socket.to(socket.gameId).emit('playerJoinLobby', json)
        })
      console.log(`${socket.user} s'est connecté a ${socket.channel}`)

    }
    catch (error) {
      console.log('===================================')
      console.log('==========TRYCATCH ERROR===========')
      console.log('===================================')
      socket.emit('errorJoinLobby', error)
      console.log(error)
    }

  })
  socket.on('refreshPool', async () => {
    await fetch('http://localhost:5000/pool')
      .then(response => response.json())
      .then(json => {
        socket.emit('refreshedPool', json)
        socket.broadcast.emit('refreshedPool', json)
      })
  })
  socket.on('disconnect', () => {
    console.log('Player disconnected')
    socket.leaveAll()
    socket.in(socket.channel).emit('playerDisconnect', { id: socket.user })

  })
})
serverLobby.listen(LOBBY_PORT, () => {
  console.log(`Lobby socket listening on port ${LOBBY_PORT}`)
})
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
const { emit } = require('./model/db');
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
    
    
    fetch(`http://localhost:5000/lobby/${game_id}`)
      .then(response => response.json())
      .then(json => {socket.emit('playerList', json)})

    fetch(`http://localhost:5000/deck/${game_id}/${user}`)
      .then(response => response.json())
      .then(json => { socket.emit('userCard', json) })

    fetch(`http://localhost:5000/ccount/${game_id}/${user}`)
      .then(response => response.json())
      .then(json => { socket.emit('othersCount', json) })

    fetch(`http://localhost:5000/pot/${game_id}`)
      .then(response => response.json())
      .then(json => { socket.emit('cardsPot', json) })
    fetch(`http://localhost:5000/pothistory/${game_id}`)
      .then(response => response.json())
      .then(json => { socket.emit('potHist', json)})
    
    console.log(`Player ${user} received his cards`)
  })

  socket.on('chgpile', (data) => {
    const game_id = data.gid
    const newCards = data.newcds
    let newpile = [];
    fetch(`http://localhost:5000/potd/${game_id}`)
    newCards.map((value, key) => {
      const fetchmsg = `http://localhost:5000/pots/${game_id}/` + String(value)
      newpile.push(value)
      fetch(fetchmsg).catch(erreur => { throw erreur})
      fetch('http://localhost:5000/pothistory/card', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: game_id,
                    card: value
                })
            })
            .catch(erreur => { throw erreur})
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
    const game_id = socket.channel
    const user = socket.user

    fetch('http://localhost:5000/toggle/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: socket.channel,
                    pseudo: socket.user
                })
            })
    fetch('http://localhost:5000/toggle/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  "Acces-Control-Allow-Origin": "true"
              },
              body: JSON.stringify({
                  gameId: socket.channel,
                  pseudo: data
              })
          })
    
    fetch(`http://localhost:5000/ccount/${game_id}/${user}`)
      .then(response => response.json())
      .then(json => { socket.emit('updateCards', json) })
      .catch(erreur => { throw erreur})
    socket.to(socket.channel).emit('userPlayed', data)
      
  })
  socket.on('needPotHistory', (data)=> {
    fetch(`http://localhost:5000/pothistory/${game_id}`)
      .then(response => response.json)
      .then(json => { socket.emit('deliverHistory', json)})
      .catch(erreur => { throw erreur})
  })
  socket.on('requestUpdate', (data)=> {
    const game_id= socket.channel
    fetch(`http://localhost:5000/ccount/${game_id}/${data}`)
      .then(response => response.json())
      .then(json => { socket.emit('updateCards', json) })
  })
  socket.on('finishTurnPass', (data) => {  
    socket.to(socket.channel).emit('userPassed', data)
  })
  socket.on('startPlaying', (data) => {
    fetch('http://localhost:5000/toggle',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: socket.channel,
                pseudo: data.user
            })
        })
    socket.to(socket.channel).emit('gameStarted', data.user)
    socket.emit('gameStarted', data.user)
  })
  socket.on('resetPile', data =>{
    fetch(`http://localhost:5000/potd/${socket.channel}`)
  })
  socket.on('endOfRound', data => {
    
    fetch('http://localhost:5000/pothistory/card', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: socket.channel,
                    card: '000:000'
                })
            })
    socket.to(socket.channel).emit('newRound', socket.user)
  })
  socket.on('delCardFinish', (data)=>{
    
    const rank = data.rank
    const user = data.us
    const list= data.finlist
    fetch('http://localhost:5000/rank', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          user: data.us,
          rang: rank
      })
  })
      socket.to(socket.channel).emit('someoneFinished', {user: user, winlist:list})
      socket.emit('someoneFinished', {user: user, winlist:list})
  })

  socket.on('gameIsFinished', async (data)=> {
    const game_id = data.gid
    const beggar = data.beggar
    const vicebeggar = data.vicebeggar
    await fetch('http://localhost:5000/toggle/', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          pseudo: vicebeggar
      })
  })
    await fetch('http://localhost:5000/rank', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          user: vicebeggar,
          rang: '4'
      })
    })
    await fetch('http://localhost:5000/rank', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          user: beggar,
          rang: '5'
      })
    })
    let jsoned
    await fetch(`http://localhost:5000/lobby/${socket.channel}`)
      .then(response => response.json())
      .then(json => {jsoned = json})
    socket.to(socket.channel).emit('endOfGame', jsoned) 
  })
  socket.on('refreshEOG', async (data)=>{
    let jsoned
    await fetch(`http://localhost:5000/lobby/${data}`)
      .then(response => response.json())
      .then(json => {jsoned = json})
    socket.emit('endOfGame', jsoned) 
  })

  socket.on('readyAnother', async (data)=>{
    await fetch('http://localhost:5000/toggle/', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          pseudo: data
      })
    })
    socket.to(socket.channel).emit('playerReady', data)
  })
  socket.on('notReadyAnother', async (data)=>{
    await fetch('http://localhost:5000/toggle/', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          pseudo: data
      })
    })
    socket.to(socket.channel).emit('playerNotReady', data)
  })
  socket.on('sendDataHistory', async (data) => {
    for(let i=0; i < data.length; i++){
      await fetch('http://localhost:5000/history/set/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
            gameId: socket.channel,
            userId: data[i].user,
            position: data[i].rang
        })
      })
      await fetch('http://localhost:5000/toggle/zero', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Acces-Control-Allow-Origin": "true"
        },
        body: JSON.stringify({
            gameId: socket.channel,
            pseudo: data[i].user
        })
      })
      await fetch('http://localhost:5000/rank', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          user: data[i].user,
          rang: '0',
      })
    })
    }
    const namePotHistory = socket.channel+'PotHistory'
    await fetch('http://localhost:5000/deck/wipe', {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: namePotHistory
      })
    })
    await fetch('http://localhost:5000/deck/wipe', {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel
      })
    })
    let jsonlobby
    await fetch(`http://localhost:5000/lobby/${socket.channel}`)
      .then(response => response.json())
      .then(json => {jsonlobby = json})
    await fetch('http://localhost:5000/deck', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          lobby: jsonlobby,
      })
    })
    io.in(socket.channel).emit('giveCards', socket.user)
  })
  socket.on('exchangeCards', async (data)=>{
    const usr = data.usr
    const num = data.num
    const recieveUsr= data.pseudo
    
    if(num === 1){
      const card1 = data.cards[0]
      await fetch(`http://localhost:5000/dcard/${socket.channel}/${usr}/${card1}`)
      await fetch(`http://localhost:5000/icard/${socket.channel}/${recieveUsr}/${card1}`)
    }
    else if(num ===2){
      const card1 = data.cards[0]
      const card2 = data.cards[1]
      await fetch(`http://localhost:5000/dcard/${socket.channel}/${usr}/${card1}`)
      await fetch(`http://localhost:5000/dcard/${socket.channel}/${usr}/${card2}`)
      await fetch(`http://localhost:5000/icard/${socket.channel}/${recieveUsr}/${card1}`)
      await fetch(`http://localhost:5000/icard/${socket.channel}/${recieveUsr}/${card2}`)
    }
    await fetch(`http://localhost:5000/toggle/zero`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Acces-Control-Allow-Origin": "true"
      },
      body: JSON.stringify({
          gameId: socket.channel,
          pseudo: usr,
      })
    })
    socket.to(socket.channel).emit('exchangeRdy', usr )
  })
  socket.on('retrieveCards', (data) => {
    fetch(`http://localhost:5000/deck/${socket.channel}/${data}`)
      .then(response => response.json())
      .then(json => { socket.emit('switchCards', json) })

  })
  socket.on('disconnect', () => {
    console.log(`${socket.user} disconnected`)
    socket.emit('playerdeconnexion', { user: socket.user })
  })
})

server.listen(GAME_PORT, () => {
  console.log(`Game socket listening on port ${GAME_PORT}`)
})

/********** CHAT SOCKET **********/
const serverChat = http.createServer(app)
const ioChat = socketio(serverChat)
const {addUser, removeUser, getUser, getRoomUsers} = require('./users')

ioChat.on('connection', (socket) => {
  console.log(`new client ${socket.id} connected`)
  socket.emit('connection', null)

  socket.on('join_room', ({chatName, roomName}, callback) => {
      const {error, user} = addUser({id: socket.id, chatName, roomName})
      if(error) return callback(error)

      socket.emit('message', {user: 'admin', text: `Hi, ${user.chatName}!`})
      socket.broadcast.to(user.roomName).emit('message', {user: 'admin', text: `${user.chatName} has entered the chat!`})

      socket.join(user.roomName)

  })

  socket.on('send_message', (message, callback) => {
      const user = getUser(socket.id)
      ioChat.to(user.roomName).emit('message', {user: user.chatName, text: message})
  })

  socket.on('reconnect', () => {
    console.log(`client ${socket.id} reconnected`)

  })

  socket.on('disconnect', () => {
    console.log(`client ${socket.id} disconnected`)
  })

  socket.on('reconnect_error', () => {
    console.log('cannot reconnect')
  })

})

serverChat.listen(CHAT_PORT, () => {
  console.log(`Chat socket started on port ${CHAT_PORT}`)
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
          rang: '0',
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
          rang: '0',
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
          socket.emit('repPlayerJoin', json);
          socket.to(socket.gameId).emit('playerJoinLobby', json)
        })
      console.log(`${socket.user} s'est connecté a ${socket.channel}`)

    }
    catch (error) {
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
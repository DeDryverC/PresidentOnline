const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');

//server ports
const DB_PORT = process.env.PORT || 5000
const CHAT_PORT = process.env.PORT || 5001

//database components
app.get("/", (req, res) => {
  res.json({message : "welcome to our api"})
});

app.use(cors());
app.use(require("body-parser").json())

const routes = require("./routes/user.route")(app);

// console.log that your server is up and running
app.listen(DB_PORT, () => {
  console.log(`the server is running on ${DB_PORT}`);
});

//chat components
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const {addUser, removeUser, getUser, getRoomUsers} = require('./users')

io.on('connection', (socket) => {
  console.log(`new client ${socket.id} connected`)
  socket.emit('connection', null)

  socket.on('join_room', ({userName, room}, callback) => {
      const {error, user} = addUser({id: socket.id, userName, room})
      if(error) return callback(error)

      socket.emit('message', {user: 'admin', text: `Hi, ${user.userName}!`})
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.userName} has entered the chat!`})

      socket.join(user.room)

      callback()
  })

  socket.on('send_message', (message, callback) => {
      const user = getUser(socket.id)

      io.to(user.room).emit('message', {user: user.userName, text: message})
  })

  socket.on('disconnect', () => {
      console.log(`client ${socket.id} disconnected`)
  })
})

server.listen(CHAT_PORT, () => {
  console.log(`Server started on port ${CHAT_PORT}`)
})
const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

app.use(express.static(path.join(__dirname + '/client')));

app.get('/', function(req, res) {
  res.show('index.html');
});

const messages = [];
const users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

io.on('connection', socket => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', user => {
    newUser = { id: socket.id, user: user };
    users.push(newUser);
    socket.broadcast.emit('join', user);
  });

  socket.on('message', message => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    for (let activeUser of users) {
      if (activeUser.id === socket.id) {
        const index = users.indexOf(activeUser);
        users.splice(index,activeUser.id);
        socket.broadcast.emit('leave', activeUser.user);
      }
    }
  });
  console.log("I've added a listener on message and disconnect events \n");
});

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { conn } = require('./database/config');
const Routes = require('./routes/index');
const path = require('path');
const { Server } = require('socket.io'); 
const { createServer } = require('node:http');
const ChatMessage = require('./models/ChatMessage');
const {createChatMessage } = require('./services/chat_messageService')

const app = express();
const port = process.env.PORT || 3000;

conn();

app.use(morgan('dev'));
app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use('/api', Routes);

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo! Bienvenido a chat_app');
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let connectedUsers = [];

io.on('connection', (socket) => {
  socket.on('user connected', (user) => {
    console.log(`Usuario ${user.name} ${user.lastname}`);
    
    const userExists = connectedUsers.some(connectedUser => connectedUser.user._id === user._id);    
    if (!userExists) {
      connectedUsers.push({ socketId: socket.id, user });
      io.emit('update user list', connectedUsers);
    }
  });

  socket.on('new message', async (newMessageReceived) => {
    try {
      console.log('Llegó desde el socket: \n ' + JSON.stringify(newMessageReceived));
      const savedMessage = await createChatMessage(newMessageReceived.text, newMessageReceived.userId);

      io.emit('message received', savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter(connectedUser => connectedUser.socketId !== socket.id);
    io.emit('update user list', connectedUsers);
    console.log('Usuario desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importar cors
const { conn } = require('./database/config');
const Routes = require('./routes/index');
const path = require('path');
const { Server } = require('socket.io'); 
const { createServer } = require('node:http'); 

const app = express();
const port = process.env.PORT || 3000;

conn();

app.use(morgan('dev'));
app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS para todas las rutas
app.use(cors({
  origin: '*', // Permitir cualquier origen, ajusta según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use('/api', Routes);

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo! Bienvenido a chat_app');
});

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.emit('connected');
  });
  
  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('new message', async (newMessageRecieved) => {
  console.log(newMessageRecieved)
  });

  io.emit('message received', newMessageRecieved);

  socket.off('setup', () => {
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

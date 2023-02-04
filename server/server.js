import mongoose from 'mongoose';
import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL.replace('<password>', process.env.DB_PW), {
  useNewUrlParser: true, // <-- no longer necessary
  useUnifiedTopology: true, // <-- no longer necessary
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: 'http://localhost:5173',
});

const users = new Map();

io.on('connection', (socket) => {
  socket.on('sendUser', (userId) => {
    users.set(userId, socket.id);
    io.emit('getUsers', [...users.keys()]);
  });

  socket.on('sendMessage', (message) => {
    // console.log({ message });
    io.to(users.get(message.receiverId)).emit('getMessage', message);
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

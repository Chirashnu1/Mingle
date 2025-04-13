
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Store active users
const activeUsers = new Map();

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  const userName = socket.handshake.query.userName;
  
  console.log(`User connected: ${userName} (${userId})`);
  
  // Add user to active users
  activeUsers.set(userId, { id: userId, name: userName, socketId: socket.id });
  
  // Broadcast to all clients that this user is online
  io.emit('user:online', userId);
  socket.broadcast.emit('user:connected', userId);
  
  // Send list of online users to newly connected user
  const onlineUserIds = [...activeUsers.keys()];
  socket.emit('users:online', onlineUserIds);
  
  // Handle new messages
  socket.on('message:send', (message) => {
    console.log('New message:', message);
    
    // Broadcast message to all clients (including sender)
    io.emit('message:new', {
      ...message,
      timestamp: new Date(),
    });
    
    // In a real app, you would store this in a database
  });
  
  // Handle typing indicators
  socket.on('user:typing:start', ({ chatId, userId }) => {
    console.log(`User ${userId} is typing in chat ${chatId}`);
    socket.broadcast.emit('user:typing', { chatId, userId, isTyping: true });
  });
  
  socket.on('user:typing:stop', ({ chatId, userId }) => {
    console.log(`User ${userId} stopped typing in chat ${chatId}`);
    socket.broadcast.emit('user:typing', { chatId, userId, isTyping: false });
  });
  
  // Handle read receipts
  socket.on('messages:read', ({ chatId, userId }) => {
    console.log(`User ${userId} read messages in chat ${chatId}`);
    socket.broadcast.emit('messages:read', { chatId, userId });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userName} (${userId})`);
    
    // Remove user from active users
    activeUsers.delete(userId);
    
    // Broadcast to all clients that this user is offline
    io.emit('user:offline', userId);
    socket.broadcast.emit('user:disconnected', userId);
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Chat Server is running');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

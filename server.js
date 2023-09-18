require('dotenv').config()
const express = require('express');
const expressWs = require('express-ws')(express()); 
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require("ws"); 

const app = expressWs.app; //////////////////NEW
const wss = expressWs.getWss(); 
const fs = require("fs"); 
const path = require("path") 

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(cors());
// app.use(express.static(__dirname));

const router = require('./routes/allTalkChats')
app.use('/', router)

// app.listen(9000, () => {
//     console.log('Server started on port 9000')
// })


/////////////////////////////////////////////NEW
app.ws('/websocket', (ws, req) => {
    // Handle WebSocket connections here
    console.log('WebSocket connected');
    ws.on('message', (message) => {
      // Handle incoming WebSocket messages
      console.log('Received message:', message);
      
      // Broadcast the message to all connected clients (you can modify this as needed)
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.on('close', () => {
      // Handle WebSocket disconnections
      console.log('WebSocket disconnected');
    });
  });
////////////////////////////////////
///////////////////////////////////

module.exports = app;
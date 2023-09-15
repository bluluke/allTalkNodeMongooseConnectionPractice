require('dotenv').config()
const express = require('express');
const expressWs = require('express-ws')(express()); //new
const mongoose = require('mongoose');
const WebSocket = require("ws"); //new

const app = express();
const wss = expressWs.getWss(); //new
const fs = require("fs"); //new
const path = require("path") //new

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(express.static(__dirname));

const router = require('./routes/allTalkChats')
app.use('/', router)

app.listen(9000, () => {
    console.log('Server started on port 9000')
})
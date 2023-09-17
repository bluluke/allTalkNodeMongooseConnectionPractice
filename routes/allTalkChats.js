const express = require('express');
// const expressWs = require('express-ws')(express()); //new
const router = express.Router();
const chat = require('../models/allTalkChats')
// const wss = expressWs.getWss(); //new
// const WebSocket = require("ws"); //new

// const fs = require("fs"); //new
// const path = require("path") //new

router.get('/', async (req, res) => {
    try {
        const allTalkChats = await chat.find();
        res.json(allTalkChats);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    //new:
    // const indexPath = path.join(__dirname, 'index.html');
    // fs.readFile(indexPath, 'utf-8', (err, data) => {
    //     if(err) {
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.send(data);
    //     }
    // })
    ////////////////
   
})

router.post('/', async (req, res) => {
    const aChat = new chat({
        chatName: req.body.chatName,
        chatCreator: req.body.chatCreator
    })
    try {
        const aNewChat = await aChat.save();
        res.status(201).json(aNewChat); 
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/message', async (req, res) => {
    const newMessage = {
        sender: req.body.sender,
        messageContent: req.body.messageContent,
        timeSent: Date.now
    }
    const chatId = req.body.id;
    // console.log('newMessage: ', newMessage, 'chatId:', chatId);
    const chatToUpdate = await chat.findByIdAndUpdate(
        chatId,
        { $push: { messages: newMessage } },
        { new: true }
    );
})



module.exports = router; 
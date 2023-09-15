const mongoose = require('mongoose');

const chatListSchema = new mongoose.Schema({
    chatName: {
        type: String,
        require: true
    }, 
    chatCreator: {
        type: String,
        require: true
    }, 
    time: {
        type: Date,
        require: true,
        default: Date.now
    },
    messages: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('chat', chatListSchema, 'chat-list')
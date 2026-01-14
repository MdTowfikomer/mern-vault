const mongoose = require("mongoose");

// creating schema for the chats
const chatSchema = new mongoose.Schema(
    {
        from:{
            type: String,
            require: true
        },
        to:{
            type: String,
            require: true,
        },
        message:{
            type: String,
            maxLength: 50, // Constraint for msg
        },
        created_at:{
            type: Date,
            require: true,
        }
    }
)

// creating model from schema

const Chat = mongoose.model("Chat",chatSchema);

// exporting the model to the index.js

module.exports = Chat;

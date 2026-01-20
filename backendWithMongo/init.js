const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeChatApp");
}

main()
.then((res)=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err);
});


let chats = [
    {
        from: "amit",
        to: "sumit",
        message: "send me your notes",
        created_at: new Date()
    },
    {
        from: "sumit",
        to: "amit",
        message: "okay i will send you by evening",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        message: "can you teach me js",
        created_at: new Date()
    },
    {
        from: "mohit",
        to: "rohit",
        message: "sure i will",
        created_at: new Date()
    },
    {
        from: "shradha",
        to: "aman",
        message: "are you coming to college tomorrow",
        created_at: new Date()
    },
    {
        from: "aman",
        to: "shradha",
        message: "yes i will be",
        created_at: new Date()
    },
]

Chat.insertMany(chats)
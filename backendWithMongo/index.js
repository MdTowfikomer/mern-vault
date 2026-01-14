const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
//ejs setup
app.set("view engine", "ejs");

// setting up views and public directory
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

// mongoDB setup
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
}
main()
.then((res)=>{
    console.log("Connected successfully");
})
.catch((err)=>{
    console.log(err);
});


// root route
app.get("/", (req, res)=>{
    res.send("This is root page");
})

// index route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find(); // retrieve all the data from the DB
    res.render("index", {chats});
});

// insert Chat route
app.get("/chats/new", (req,res)=>{
    res.render("new");
});

app.post("/chats", async (req, res) => {
    try {
        const { to, from, message } = req.body;
        const newChat = new Chat({
            to,
            from,
            message,
            created_at: new Date()
        });
        await newChat.save();
        res.redirect("/chats");
    } catch (err) {
        console.error(err);
    }
});

// update route
app.get("/chats/:id/edit",async (req,res)=>{
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit", {chat});
    }catch(err){
        console.log(err);
    }
});

app.put("/chats/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let {message} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, {message : message}, {runValidators:true, new:true});
        if (updatedChat){
            console.log(updatedChat);
            res.redirect("/chats");
        }else{
            res.status(404).send("chat not found");
        }
    }catch(err){
        console.log(err);
        res.status(500).send("An error occurred while updating the chat.");
    }
});


//Delete route
app.delete("/chats/:id",async(req,res)=>{
    try{
        let {id} = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);
        if(!deletedChat){
            return res.status(404).send("chat not found..!");
        }
        console.log("Message Deleted..!");
        res.redirect("/chats");
    }catch(err){
        console.log(err);
    }
});


app.listen(port, (req,res)=>{
    console.log(`Server is running at localhost ${port}`);
});

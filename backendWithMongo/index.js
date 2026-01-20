const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const ExpressError = require("./expressError.js");

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
    await mongoose.connect('mongodb://127.0.0.1:27017/fakeChatApp')
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
app.get("/chats", async (req,res,next)=>{
    try{
        let chats = await Chat.find(); // retrieve all the data from the DB
        res.render("index", {chats});
    }catch(err){
        next(err);
    }
});

// insert Chat route
app.get("/chats/new", (req,res)=>{
    // throw new ExpressError(404,"page not found");
    res.render("new");
});

app.post("/chats", async (req, res,next) => {
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
        next(err);
    }
});

// show route
app.get("/chats/:id", async(req,res,next)=>{
    try {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            // throw new ExpressError(500, "Chat not found");
            next(new ExpressError(404, "Chat not found"));
        }
        res.render("show", {chat});
    } catch (err) {
        next(err);
    }
});




// update route
app.get("/chats/:id/edit",async (req,res)=>{
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit", {chat});
    }catch(err){
        next(err);
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
        next(err);
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
        next(err);
    }
});

// Error handling midddleware
app.use((err,req,res,next)=>{
    let {status=502, message="Found some error"} = err;
    res.status(status).send(message);
});

app.listen(port, (req,res)=>{
    console.log(`Server is running at localhost ${port}`);
});

// post -> username, content
// Get -> view, individual
// patch -> edit
// delete -> delete

// resource are the data where we're doing the CRUD

// GET      /posts => to get data for all posts (index )
// POST     /posts => to add a new post     (create)
// GET      /posts/:id => to get one post by id (view)
// PATCH    /posts/:id => to update specific post (update)
// DELETE   /posts/:id => to delete specific post  (delete) [destoryls route]
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const {v4: uuidv4} = require('uuid');
const path = require('path'); // to use the folder in the index.js we require path


// to parse urls
app.use(express.urlencoded({extended : true})); // before it was able to parse? what?
app.use(express.static(path.join(__dirname, "public"))); // fixing the path of public dir
app.use(methodOverride('_method'));

app.set("v iew engine","ejs");
app.set("views", path.join(__dirname, 'views')); // fixing the path of view dir

let posts = [
    {
        id : uuidv4(),
        username : "Hello",
        content : "world"
    },
    {
        id : uuidv4(),
        username : "Hell nah",
        content : "No way..!"
    },
    {
        id : uuidv4(),
        username : "What's up maa...",
        content : "Niggaaaa..."
    },

]


app.get("/", (req, res)=>{
    res.send("Server is working good");
});

// first API to see VIEW all the posts
app.get("/posts", (req, res)=>{
    res.render('index.ejs', {posts}); // sending data(posts to index.ejs)
});

app.get("/posts/id", (req, res)=>{
    res.send("This post page Id part");
});

// 2nd API to add 

// WORKING //

// button
//   |
//  \ /
// form
//   |
//  \ /
// send data to backend
//   |
//  \ /
// stores data to an database(array in this case)

// BUILDING 
// 1st GET req new route which is form
// 2nd POST to add the new post

// 1st 
app.get('/posts/new', (req, res)=>{
    res.render('new.ejs');
});

// 2nd
app.post('/posts', (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect('/posts');
});

// 3rd API to get post by id
app.get('/posts/:id', (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    res.render('view.ejs', {post});
});

// 4th API to edit posts
app.put('/posts/:id', (req, res)=> {
    let {id } = req.params;
    let newContent = req.body.content; 
    let post = posts.find((p)=> id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

// 5th API to delete posts
app.delete('/posts/:id', (req,res)=>{
    let {id} = req.params;
    // let post = posts.find((p)=> id === p.id);
    posts = posts.filter((p)=> id != p.id);
    res.redirect('/posts'); 
});


app.listen(5000, ()=>{
    console.log("listening to port: 5000");
});
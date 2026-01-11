const {faker, tr} = require("@faker-js/faker");
const mysql = require("mysql2");
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

let getRandomUser = () => {
    return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    ];
};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'express',
    password: process.env.DB_PASSWORD
});

// root route SHOW COUNT
app.get("/", (req, res)=>{
    let q = "SELECT COUNT(id) FROM user";
    try{
        connection.query(q,(err, result)=>{
            if(err) throw err;
            let users = result[0]["COUNT(id)"];
            res.render("home", {users});
        });
    } catch(err){
        console.log(err);
        res.send("Unable to fetch the data");
    }
});

// user route SHOW USER DATA
app.get("/user",(req,res)=>{
    let q = "SELECT id, username, email FROM user";
    try{
        connection.query(q, (err, result)=>{
            if (err) throw err;
            let users = result;
            res.render("show", {users});
        });
    } catch(err){
        console.log(err);
        res.send("query is not working");
    }
});

// Edit route
app.get("/user/:id/edit", (req,res)=>{
    let {id} = req.params;

    let q = `SELECT * FROM user WHERE id = "${id}";`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user = result[0];
            console.log(user);
            res.render("edit", {user});
        });
    }catch(err){
        res.send("unable to fetch data from the DB");
    }
});

app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password, username, email} = req.body; 
    let q = `SELECT * FROM user WHERE id = "${id}";`;
    try{
        connection.query(q, (err, result)=>{
            if (err) throw err;
            let user = result[0];
            if(password == user.password){
                let sub_q = `UPDATE user SET username ="${username}", email = "${email}" WHERE id = "${id}";`
                try{
                    connection.query(sub_q, (err, result)=>{
                        if(err) throw err;
                        res.redirect("/user");
                    });
                }catch(err){
                    console.log(err);
                    res.send(err);
                }
            } else{
                res.send("Wrong password");
            }
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
})



app.listen(port, (req,res)=>{
    console.log(`Server is running at the localhost: ${port}`);
});

// connection.end();
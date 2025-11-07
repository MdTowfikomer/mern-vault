require('dotenv').config();
const express = require('express');
const {faker} = require('@faker-js/faker');
const mySql = require('mysql2');    // get the client
const path = require('path');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create the Connection to database
const connection = mySql.createConnection({
    host: 'localhost' ,
    user: 'root',
    database: 'node_app',
    password: process.env.DB_PASSWORD
});

// this function will return the array now..!
let getRandomUser = () => {
    return [    
       faker.string.uuid(),
       faker.internet.username(),
       faker.internet.email(),
       faker.internet.password()
    ];
};


//quering the DB

//inserts a new record into a database table named user using placeholder '?'.
// let query = "INSERT INTO user(id, username, email, password) VALUES ?"; // now it will take the whole array as 1 placeholder
// let userData = [];
// for(let i = 1; i<=1; i++){
//     userData.push(getRandomUser()); // 100 random user's data
// }

// try{
//     connection.query( query, [userData], (err, result)=>{ // parameter: query string, user's data, callback function: err for error message and result for 
//         if(err) throw err;
//         console.log(result); // result is an array
//         console.log(result.length);
//     });
// } catch(err){
//     console.log(err);
// }

// // closing the connection with DB
// connection.end();


// Routing

app.get('/', (req, res)=>{
    // show no of user in DB
    let q = `SELECT count(*) FROM user`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let count = result[0]['count(*)'];
            res.render("home.ejs", {count});
        });
    } catch(err){
        res.send("Something went wrong");
    }
});

app.get('/user',(req,res)=>{
    // show users (email, id, username) via EJS
});

app.patch('/user/:id', (req, res)=>{
    //username edit
});

app.post('/user', (req, res)=>{
    // add new user
});

app.delete('/user/:id', (req, res)=>{
    // delete user
    // before deleting ask password from user..!
});

app.listen(port, (req, res)=>{
    console.log(`Server is running at localhost: ${port}`);
})

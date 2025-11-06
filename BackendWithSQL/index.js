require('dotenv').config();
const {faker} = require('@faker-js/faker');
const mySql = require('mysql2');    // get the client

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
let query = "INSERT INTO user(id, username, email, password) VALUES ?"; // now it will take the whole array as 1 placeholder
let userData = [];
for(let i = 1; i<=1; i++){
    userData.push(getRandomUser()); // 100 random user's data
}

try{
    connection.query( query, [userData], (err, result)=>{ // parameter: query string, user's data, err for error message and result for 
        if(err) throw err;
        console.log(result); // result is an array
        console.log(result.length);
    });
} catch(err){
    console.log(err);
}

// closing the connection with DB
connection.end();



const {faker} = require('@faker-js/faker');
const mySql = require('mysql2');    // get the client

// Create the Connection to database
const connection = mySql.createConnection({
    host: 'localhost' ,
    user: 'root',
    database: 'node_app',
    password: 'CONNECTION_PASSWORD'
});

//quering the DB

//inserts a new record into a database table named user using placeholder '?'.
let query = "INSERT INTO user(id, username, email, password) VALUES (?, ?, ?, ?)";
let userData = ['3456', 'wertgh456', '34567!fghj@ghj.com', '456yhbnj56A'];
try{
    connection.query( query, userData, (err, result)=>{ // parameter: query string, user's data, err for error message and result for 
        if(err) throw err;
        console.log(result); // result is an array
    });
} catch(err){
    console.log(err);
}

// closing the connection with DB
connection.end();

let getRandomUser = () => {
    return {    
       userId: faker.string.uuid(),
       username: faker.internet.username(),
       email: faker.internet.email(),
       password: faker.internet.password()
    };
}


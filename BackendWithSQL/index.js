const {faker} = require('@faker-js/faker');
const mySql = require('mysql2');    // get the client

// Create the Connection to database
const connection = mySql.createConnection({
    host: 'localhost' ,
    user: 'root',
    database: 'node_app',
    password: 'YOUR_CONNECTION_PASSWORD'
});

//quering the DB
try{
    connection.query("SHOW TABLES", (err, result)=>{
        if(err) throw err;
        console.log(result);
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


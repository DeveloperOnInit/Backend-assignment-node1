const mysql = require('mysql2');
require('dotenv').config({ path: '../api/bin/.env' });


const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER1,
    password:process.env.PASSWORD, 
    database:process.env.DATABASE
});




connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
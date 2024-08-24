const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'sql12727658' ,    //process.env.USER,
    password:  '65vbDUhYCF',   // process.env.PASSWORD, 
    database: 'sql12727658'   //process.env.DATABASE
});




connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
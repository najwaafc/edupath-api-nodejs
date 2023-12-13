const mysql = require('mysql2');

const connection = mysql.createConnection({
    host :process.env.DB_HOST ,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'edupath-db',
});

module.exports=connection;
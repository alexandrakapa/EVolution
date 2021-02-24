const mysql = require('mysql');
// $servername = "localhost:8889";
// $username = "root";
// $password = "root";
// $db = "Evolution";
// create here mysql connection
const disconnect_handler =mysql.createConnection({
    host: 'localhost',
    user: 'root',       //the credentials for our database
    password: 'mysql',
    database: 'Evolution'
});
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',       //the credentials for our database
    password: 'mysql',
    database: 'Evolution'
});

dbConn.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // db error reconnect
        disconnect_handler();
    } else {
        throw err;
    }
});

module.exports = dbConn;

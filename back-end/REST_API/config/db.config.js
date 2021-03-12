const mysql = require('mysql');

// create here mysql connection

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',       //the credentials for our database
    password: 'mysql',
    database: 'Evolution'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;

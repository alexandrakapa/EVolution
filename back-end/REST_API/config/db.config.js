const mysql = require('mysql');

//create mysql connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'katerliag1501',
    database: 'Evolution',
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;
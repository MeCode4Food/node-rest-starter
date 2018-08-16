const mysql = require("mysql");
const config = require("./config/config.json");

module.exports = function(callback){
    // connect to database, and pass it to callback

    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password
    });

    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected to MYSQL server");
    })
    callback();
}
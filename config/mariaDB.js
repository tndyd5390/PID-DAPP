var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'http://192.168.40.128',
    port : 3306,
    user : 'root',
    passwor : 'icn0690!',
    database : 'mysql'
});

module.exports = conn;
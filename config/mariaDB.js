var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'http://192.168.109.132',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'fabricDB'
});

module.exports = conn;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ib!26december',
    database: 'employee'
}, console.log('connected to employee database'));

module.exports = db;
// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'MySuperPass@123',
  database: 'booksDb'
});

module.exports = pool.promise();

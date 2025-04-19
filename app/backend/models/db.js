// /models/db.js
const mysql = require('mysql2/promise'); // or pg for PostgreSQL

const pool = mysql.createPool({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8773768',
  password: 'RJi1vkUMZw',
  database: 'sql8773768',
  port:3306,
  connectTimeout: 10000, // 10 seconds
  connectionLimit: 10, // Freesqldatabase.com may limit concurrent connections
});

module.exports = pool;

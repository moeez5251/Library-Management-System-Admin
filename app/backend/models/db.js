// /models/db.js
const mysql = require('mysql2/promise'); // or pg for PostgreSQL

const pool = mysql.createPool({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8773768',
  password: 'RJi1vkUMZw',
  database: 'sql8773768',
});

module.exports = pool;

require("dotenv").config();
const sql = require('mssql');


const config = {
  user: process.env.user,
  password: process.env.DB_PASS,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to Somee MSSQL database');
    return pool;
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

module.exports = {
  sql, poolPromise
};

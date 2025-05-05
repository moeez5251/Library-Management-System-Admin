const sql = require('mssql');

const config = {
  user: 'moeez5251_SQLLogin_3',
  password: 'hf67iurvdp',
  server: 'moeez5251.mssql.somee.com', // SQL Server address
  database: 'moeez5251',
  options: {
    encrypt: true, // Required for Azure/Somee
    trustServerCertificate: true, // Matches TrustServerCertificate=True
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

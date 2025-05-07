import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('moeez5251', 'moeez5251_SQLLogin_3', 'hf67iurvdp', {
  host: 'moeez5251.mssql.somee.com',
  dialect: 'mssql',
  logging: console.log

});

export { sequelize, DataTypes };  // Use `export` instead of `module.exports`

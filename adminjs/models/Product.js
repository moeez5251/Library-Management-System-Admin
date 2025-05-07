import { DataTypes } from 'sequelize';
import { sequelize } from './db.js'; // Assuming db.js is an ES module

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.TEXT,
});

export { Product }; // Using `export` instead of `module.exports`

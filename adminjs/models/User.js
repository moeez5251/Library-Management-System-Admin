import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from './db.js';  // Make sure your `db.js` is updated for ESM

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,  // Default value as UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures the email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', // Default role is "user"
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false,  // Disable timestamps
  }
);

// Hook to hash the password before saving the user
User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    // Only hash the password if it has changed
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

export { User };

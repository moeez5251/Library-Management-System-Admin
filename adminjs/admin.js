import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { sequelize } from './models/db.js'; // assuming you use Sequelize
import { User } from './models/User.js'; // example model
import { Product } from './models/Product.js'; // example model

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize], // Sequelize instance
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          // Role as a dropdown
          role: {
            type: 'string',
            availableValues: [
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ],
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          // Password field - editable during user creation, non-editable after creation
          password: {
            type: 'password',
            isVisible: ({ record }) => !record || record.isNew,  // Check if user is new
          },
        },
      },
    },
    { resource: Product },
  ],
  branding: {
    companyName: 'My Admin Panel',
    softwareBrothers: false,
  },
});

export default adminJs;

import express from 'express';
import session from 'express-session';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';

import adminJs from './adminjs/admin.js'; // Updated import syntax
import adminAuthMiddleware from './adminjs/middleware/admin-auth.js'; // Updated import syntax

const app = express();

app.use(session({
  secret: 'admin-secret',
  resave: false,
  saveUninitialized: false,
}));

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`✅ AdminJS running at http://localhost:${PORT}${adminJs.options.rootPath}`);
});

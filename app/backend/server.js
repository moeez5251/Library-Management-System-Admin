const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/app');
require('dotenv').config();
app.use(cors({
  origin: process.env.URL,  // MUST match your frontend
  credentials: true                 // Allow cookies to be sent
}));


app.use(express.json());
app.use(cookieParser());
const unprotectedRoutes = [
  '/api/auth/login',
  '/'
]; 
app.use((req, res, next) => {
  if (unprotectedRoutes.includes(req.path)) return next();
  verifyToken(req, res, next);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
const booksRoutes = require('./routes/book');
app.use('/api/books', booksRoutes);
const lenders = require('./routes/lenders')
app.use('/api/lenders', lenders);
const tokenRoutes = require('./routes/token');
app.use('/api/token', tokenRoutes);
const sendEmailRoutes = require('./routes/mail');
app.use('/api/mail', sendEmailRoutes);
const NotificationsRoutes = require('./routes/notifications');
app.use('/api/notifications', NotificationsRoutes);
const resourceRoutes = require('./routes/resource')
app.use('/api/resource', resourceRoutes)
app.get('/', (req, res) => {
  res.send('✅ App is alive!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

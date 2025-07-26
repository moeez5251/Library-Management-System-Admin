const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const authenticate=require('./middleware/app')
require('dotenv').config();
const allowedOrigins = process.env.URL?.split(',') || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
const unprotectedRoutes = [
  '/api/auth/login',
  '/api/auth/logout',
  '/',
  '/api/token/verify',
  '/api/token/update'
]; 
app.use((req, res, next) => {
  if (unprotectedRoutes.includes(req.path)) return next();
  authenticate(req, res, next);
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
const otherController = require('./routes/other');
app.use('/api/other', otherController);
app.get('/', (req, res) => {
  res.send('✅ App is alive!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

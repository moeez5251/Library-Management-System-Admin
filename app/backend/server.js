const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
  }));
  
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
const booksRoutes = require('./routes/book');
app.use('/api/books', booksRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

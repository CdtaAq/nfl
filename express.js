// app.js

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const db = require('./db');
const authRoutes = require('./routes/auth');

const app = express();

// Session store
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/fantasyFootballApp',
    collection: 'sessions',
});

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

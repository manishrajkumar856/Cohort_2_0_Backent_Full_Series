const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require ('cookie-parser');


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // To use cookie or set cookie

app.use('/api/auth', authRouter)


module.exports = app;
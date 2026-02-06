const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const app = express();


// Middleware
app.use(express.json()); // to read req.body
app.use(cookieParser()); // to read and store cookie


app.use('/api/auth', authRouter);



module.exports = app;
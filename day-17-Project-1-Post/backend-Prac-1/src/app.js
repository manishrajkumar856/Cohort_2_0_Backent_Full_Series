const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');

const app  = express();


// Middleware
app.use(express.json()); // For req.body
app.use(cookieParser());



app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


module.exports = app;
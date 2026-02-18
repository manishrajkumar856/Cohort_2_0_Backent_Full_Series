const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/user', userRoutes);


module.exports = app;

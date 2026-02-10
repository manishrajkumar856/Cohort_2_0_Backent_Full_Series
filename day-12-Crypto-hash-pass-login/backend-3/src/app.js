const express = require('express');
const userRouter = require('./routes/auth.routes');

const app = express();

//Middleware
app.use(express.json()); // For reading req fro req.body


app.use('/api/auth', userRouter);


module.exports = app;
const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true, // For setting Cookies in client side
    origin: 'http://localhost:5173', // Exact origin is required when we set cookies
}));

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/user', userRoutes);


module.exports = app;

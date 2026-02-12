const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModal = require('../modals/user.modals');
const { register, login } = require('../controller/auth.controller');

const authRouter = express.Router();

/**
 * POST -> Register new user
 * /api/auth/register
 */
authRouter.post('/register', register);


/**
 * POST -> login user
 * /api/auth/login
 */

authRouter.post('/login', login);


module.exports = authRouter;
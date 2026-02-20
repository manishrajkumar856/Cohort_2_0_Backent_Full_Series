const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModal = require('../modals/user.modals');
const authController = require('../controller/auth.controller');
const { identifyUser } = require('../middleware/auth.middleware');

const authRouter = express.Router();

/**
 * POST -> Register new user
 * /api/auth/register
 */
authRouter.post('/register', authController.register);


/**
 * POST -> login user
 * /api/auth/login
 */

authRouter.post('/login', authController.login);

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's info
 * @access Private
 */
authRouter.get('/get-me',identifyUser, authController.getMeController);


module.exports = authRouter;
const express = require('express');
const authController = require('../controller/auth.controller');

const authRouter = express.Router();


/**
 * REGISTER -> /api/auth/register/
 */
authRouter.post('/register',  authController.registerUserController);
authRouter.post('/login', authController.loginUserController);



module.exports = authRouter;
const express = require("express");
const userController = require('../controller/user.controller');
const { identifyUser } = require("../middleware/auth.middleware");

const userRouter = express.Router();


/**
 * @route POST  /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:userId',identifyUser, userController.followUserConatroller);
userRouter.delete('/unfollow/:userId', identifyUser, userController.unfollowUserController);

module.exports = userRouter;
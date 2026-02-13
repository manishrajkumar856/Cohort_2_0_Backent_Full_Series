const express = require('express');
const postController = require('../controller/post.controller');
const multer = require('multer');

const postRouter = express.Router();

//Multer Usage
const storage = multer.memoryStorage();
const upload = multer({storage});




/**
 * POST -> /api/posts/create_post
 */
postRouter.post('/create_post', upload.single('imgUrl'), postController.create_new_post);

module.exports = postRouter;
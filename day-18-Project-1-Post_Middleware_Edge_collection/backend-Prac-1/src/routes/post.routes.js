const express = require('express');
const postController = require('../controller/post.controller');
const multer = require('multer');

const postRouter = express.Router();


// Create Storage for imageKit
const storage = multer.memoryStorage();
const upload = multer({storage});


/**
 * CREATE POST -> /api/posts/create_post/ * 
 */
postRouter.post('/create_post', upload.single('imgUrl'), postController.createPost);
/**
 * GET ALL POST -> /api/posts/
 */
postRouter.get('/', postController.getAllPost);
/**
 * GET POST DETAILS
 */
postRouter.get('/details/:postId', postController.getPostDetails);

module.exports = postRouter;
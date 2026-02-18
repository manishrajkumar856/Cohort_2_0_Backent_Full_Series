const express = require('express');
const postController = require('../controller/post.controller');
const multer = require('multer');
const { identifyUser } = require('../middleware/auth.middleware');

const postRouter = express.Router();


/***
 * Multer Use Case 
 * -> upload.single('imageUrl');  imgUrl -> is the same name 
 *    send from frontend
 */
const upload = multer({storage: multer.memoryStorage()});


/**
 * POST /api/posts/ [protected]
 * - req.body (Only Raw formate) = {caption, image-file}  
 */

postRouter.post('/', upload.single('imgUrl'), identifyUser, postController.createPost);

/**
 * GET -> get all post of particular user
 * /api/post/
 */

postRouter.get('/',identifyUser, postController.getPostController);


/**
 * GET /api/posts/details/:postid
 * - return an details about specific post with the id. also check
 * whether the post belosgs to the user that the 
 */
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController);

/**
 * @route POST /api/posts/liike/:postId
 * @description Like a post
 * @access Private
 */
postRouter.post('/likes/:postId', identifyUser, postController.likePostController);

/**
 * @route DELETE /api/posts/unlike/:postId
 * @description Unlike a post
 * @access Private
 */
postRouter.delete('/unlike/:postId', identifyUser, postController.unlikePostController);

module.exports = postRouter;
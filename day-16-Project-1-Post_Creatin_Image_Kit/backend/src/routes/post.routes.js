const express = require('express');
const postController = require('../controller/post.controller');
const multer = require('multer');

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

postRouter.post('/', upload.single('imgUrl'), postController.createPost);


module.exports = postRouter;
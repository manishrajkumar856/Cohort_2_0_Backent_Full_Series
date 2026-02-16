require('dotenv').config();
const ImageKit = require("@imagekit/nodejs/index.js");
const {toFile} = require("@imagekit/nodejs/index.js");
const jwt = require('jsonwebtoken');
const postModel = require('../modals/post.model');



/**
 * Image Kit Usage - (Initialization)
 */
const imagekit = new ImageKit({
  
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  
});

/**
 * Creare New Post
 */

async function createPost(req, res) {


  /**
   * ImageKit Usage
   */
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "Test",
    folder: "Cohort-2-inst-clone-posts"
  });


  // Create Post
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.userId,
  })

  res.status(201).json({
    message: "Post created successfully!",
    post,
  });

}


async function  getPostController(req, res) {
  
  const posts = await postModel.find({
    user: req.user.userId,
  });

  res.status(200).json({
    message: "Post fetched successfully!",
    posts,
  });

}



async function getPostDetailsController(req, res){
 
  const userId = req.user.userId;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if(!post){
    return res.status(404).json({
      message: "Post not found",
    })
  }

  const isValidUser = post.user.toString() === userId;
  if(!isValidUser){
    return res.status(403).json({
      message: "Forbidden Content!"
    });
  }

  return res.statu(200).json({
    message: "Post fetched successfully!",
    post,
  })


}


module.exports = { createPost, getPostController, getPostDetailsController };


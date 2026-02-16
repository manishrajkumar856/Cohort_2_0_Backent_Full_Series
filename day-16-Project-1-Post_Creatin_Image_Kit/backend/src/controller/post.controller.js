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
   * Read token from cookies
   */

  const token = req.cookies.token;

  // Check token existance
  if(!token){
    return res.status(401).json({
      message: "Token not provide, Unauthorized access"
    })
  }

  // Decode token and verify
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    /**
     * 401 -> For Unauthorized access
     */
    return res.status(401).json({
      message: "User not authorized!",
    })
  }

  
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
    user: decode.userId,
  })

  res.status(201).json({
    message: "Post created successfully!",
    post,
  });

}

module.exports = { createPost };

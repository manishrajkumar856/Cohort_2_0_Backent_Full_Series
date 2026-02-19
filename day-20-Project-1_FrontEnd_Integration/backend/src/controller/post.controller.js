require('dotenv').config();
const ImageKit = require("@imagekit/nodejs/index.js");
const {toFile} = require("@imagekit/nodejs/index.js");
const jwt = require('jsonwebtoken');
const postModel = require('../modals/post.model');
const userModal = require('../modals/user.modals');
const likeModal = require('../modals/likes.model');



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


/**
 * Get All Posts
 */
async function  getPostController(req, res) {
  
  const posts = await postModel.find({
    user: req.user.userId,
  });

  res.status(200).json({
    message: "Post fetched successfully!",
    posts,
  });

}


/**
 * Get Single Post Details
 */
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


/**
 * Like a Post
 */

async function likePostController(req, res){
  const postId = req.params.postId;
  const userId = req.user.userId;

  if(!postId || !userId){
    return res.status(400).json({
      message: "Id is missing!"
    })
  }

  try {
    const user = await userModal.findById(userId);

    if(!user){
      return res.status(404).json({
        message: "User not exist with id "+userId,
      })
    }

    const isPostExist = await postModel.findById(postId);
    if(!isPostExist){
      return res.status(404).json({
        message: "Post not exist with id "+postId,
      })
    }

    const isAlreadyLike = await likeModal.findOne({
      postId: postId,
      user: userId,
    });

    if(isAlreadyLike){
      return res.status(409).json({
        message: "User already like post with id "+postId,
      })
    }

    const like = await likeModal.create({
      postId: postId,
      user: userId,
    });

    return res.status(201).json({
      message: "Like Successfully!",
      like
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!"+error
    })
  }
}

/**
 * Unlike a Post
 */

async function  unlikePostController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.userId;

  if(!postId || !userId){
    return res.status(400).json({
      message: "Id is missing",
    })
  }

  try {
    const isPostExist = await postModel.findById(postId);
    if(!isPostExist){
      return res.status(404).json({
        message: "Post not exist with id "+postId,
      })
    }

    const isPostLiked = await likeModal.findOne({
      postId,
      user: userId,
    });

    if(!isPostLiked){
      return res.status(404).json({
        message: "Post not like yet!",
      })
    }

    await likeModal.findOneAndDelete({
      postId,
      user: userId,
    })

    return res.status(200).json({
      message: "Post unlike successfully!"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    })
  }
  
}

module.exports = { createPost, getPostController, getPostDetailsController, likePostController, unlikePostController };


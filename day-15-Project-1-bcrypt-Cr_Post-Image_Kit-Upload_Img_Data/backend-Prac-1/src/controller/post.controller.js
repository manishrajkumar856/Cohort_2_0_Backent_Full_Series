require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../modals/post.model.s");
const jwt = require("jsonwebtoken");
const userModal = require("../modals/user.modals");

// ImageKit Initialization
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


/**
 * Create New Post
 */
const create_new_post = async (req, res) => {
  
  // Verify token and decode
  const token = req.cookies.token;
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(404).json({
        message: "ERROR: Unauthorized Access! "+error,
    });
  }
 
  // Check User exist or not
  const user = await userModal.findById(decode.userId);
  if(!user){
    return res.status(402).json({
        message: "Unauthorized Access!",
    });
  }

  /**
   * Upload File to imageKit
   */
  const result = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Text",
    folder: "Cohort_Project-1_Prac/Posts"
  });

  // Create Post 
  const post = await postModel({
    userId: decode.userId,
    caption: req.body.caption,
    postUrl: result.url,
  });

  // Send response to client
  return res.status(202).json({
    message: "Post create successfully!",
    post,
  });
};

module.exports = { create_new_post };

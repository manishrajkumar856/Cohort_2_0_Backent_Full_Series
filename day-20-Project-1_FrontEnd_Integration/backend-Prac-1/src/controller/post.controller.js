require("dotenv").config();
const jwt = require("jsonwebtoken");
const postModal = require("../modals/post.modals");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

/**
 *  IMAGE KIT Initialization
 */

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});



/**
 * CREATE NEW POST
 */
async function createPost(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Image file is required",
    });
  }

  // Check token existance
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token is missing! Unauthorized access",
    });
  }

  // Decode token and verify
  let decode = null;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token!",
    });
  }
  const userId = decode.userId;

  try {

    // Upload Imge ot image kit
    const result = await imageKit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: req.file.originalname,
      folder: "Instagram_Clone/Practice/Posts",
    });


    // Create New post
    const post = await postModal.create({
      caption: req.body.caption,
      imgUrl: result.url,
      imageId: result.fileId,
      user: userId,
    });

    return res.status(201).json({
      message: "Post created successfully!",
      post,
    });


  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!"
    });
  }
}


/**
 * GET ALL POST of A USER
 */
async function  getAllPost(req, res) {
    // Identify User
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Token is missing! Unauthorized Access",
        })
    }

    // Decode Token
    let decode = null;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        req.status(401).json({
            message: "Invalid token! Unauthorized Access",
        })
    }
    const userId = decode.userId;

    try {
        // Fetch all posts
        const posts = await postModal.find({user: userId});

        return res.status(200).json({
            message: "Post fetched successfully",
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error!",
        })
    }
}


/**
 * GET POST details
 */
async function getPostDetails(req, res){

    // Check id exist or not
    const postId = req.params.postId;
    if(!postId){
        return res.status(400).json({
            message: "Post Id is missing"
        })
    }

    // Check User Existance 
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Token is missing, Unauthorized access",
        })
    }

    let decode = null;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token, Unauthorized User"
        });
    }
    const userId = decode.userId;

    try {
        const post = await postModal.findById(postId);

        // Check post exist or not
        if(!post){
            return res.status(404).json({
                message: "Post not found!",
            })
        }

        // Check User Validity
        const isValidUser = post.user.toString() === userId;

        if(!isValidUser){
            return res.status(403).json({
                message:"Forbidden Content!"
            })
        }

        return res.status(200).json({
            message:"Post fetched successfully!",
            post,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

module.exports = {
  createPost,
  getAllPost,
  getPostDetails,
};

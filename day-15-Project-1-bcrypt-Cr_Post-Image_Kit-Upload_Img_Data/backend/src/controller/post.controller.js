require('dotenv').config();
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");


/**
 * Image Kit Usage - (Initialization)
 */
const imagekit = new ImageKit({
  
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  
});

// Create new post and upload
async function createPost(req, res) {
  console.log(req.file);

  /**
   * ImageKit Usage
   */
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "Test",
  });

  

  res.status(200).json({
    file,
    message: "File Send Successfully!",
  });
}

module.exports = { createPost };

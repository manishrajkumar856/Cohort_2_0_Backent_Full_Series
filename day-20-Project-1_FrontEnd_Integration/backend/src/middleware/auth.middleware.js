require('dotenv').config();
const jwt = require('jsonwebtoken');


// Identify karna kis user ne request ki hai 
async function identifyUser(req, res, next) {
  /**
   * Read token from cookies
   */

  const token = req.cookies.token;

  // Check token existance
  if (!token) {
    return res.status(401).json({
      message: "Token not provide, Unauthorized access",
    });
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
    });
  }

  // Set property in req 
  req.user = decode;
  next(); // to forward controll to controller

}


module.exports = {
    identifyUser,
}

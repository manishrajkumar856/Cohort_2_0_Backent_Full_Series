const userModal = require("../modals/user.modals");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Register New User
 */
async function registerUserController(req, res) {
  const { username, email, password, bio, profileUrl } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Required fields are missing!",
    });
  }

  /**
   * Check user existance
   */
  try {
    const isUserExist = await userModal.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message: `User already exist with this ${isUserExist.email === email ? "email" : "username"}`,
      });
    }

    // Hash Password
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModal.create({
      username,
      email,
      password: hash,
      profileUrl,
      bio,
    });

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token to cookie
    res.cookie('token', token);

    // Send response
    res.status(201).json({
        message: "User register successfully!",
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error! :"
    });
  }
}


/**
 * Login New User
 */

async function loginUserController(req, res){
    const {username, email, password} = req.body;

    if(!(username || email) || !password){
        return res.status(400).json({
            message: "Required fields are missing"
        })
    }
    
    try {

        // Find user in database 
        const user = await userModal.findOne({
            $or: [
                {username},
                {email}
            ]
        })

        // if user not exist
        if(!user){
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare Password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }


        // Create tokne and send to cookie
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully!",
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error! : "
        })        
    }
}




module.exports = {
  registerUserController,
  loginUserController,
};

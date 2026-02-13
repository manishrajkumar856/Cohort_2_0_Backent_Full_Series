require('dotenv').config();
const userModal = require("../modals/user.modals");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{
    const {username, email, password, profileUrl, bio} = req.body;
    
    /**
     * Check user existance 
     */

    const isUserAlreadyExist = await userModal.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: (isUserAlreadyExist.username == username) ? "User already exist with this username" : "User already exist with this email"
        });
    }

    /**
     * Bcrypt password using bcryptjs library
     */
    const hash = await bcrypt.hash(password, 10);

    /**
     * Store user 
     */
    const user = await userModal.create({
        username,
        email,
        password: hash,
        profileUrl,
        bio,
    });

    /**
     * Create Token and send to client
     */
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    /**
     * Set token to cookie -> user cookie-parser
     */
    res.cookie('token', token);

    res.status(201).json({
        message: "User register successfully!",
        user: {
            username,
            email,
            profileUrl,
            bio,
        }
    });
}



const login = async (req, res)=>{
    const {email, username, password} = req.body;

    /**
     * Check User existance
     */
    const user = await userModal.findOne({
        $or: [
            {email},
            {password},
        ]
    });

    if(!user){
        return res.status(401).json({
            message: "User not exist!"
        })
    }

    /**
     * Compare Password
     */

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
        return res.status(404).json({
            message:"Invalid password!"
        })
    }

    /**
     * Create  new token
     */
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.cookie('token', token);

    res.status(200).json({
        message: "User looged in successfylly",
        userData: {
            username: user.username,
            email: user.email,
            profileUrl: user.profileUrl,
            bio: user.bio
        }
    })

}
module.exports = {register, login}
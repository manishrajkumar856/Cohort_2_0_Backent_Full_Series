const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModal = require('../modals/user.modals');

const authRouter = express.Router();

/**
 * POST -> Register new user
 * /api/auth/register
 */
authRouter.post('/register', async (req, res)=>{
    const {username, email, password, bio, profileUrl} = req.body;

    /**
     * Check is User  Exist
     * 
     * $or: [ {cond-1}, {cond-2}, ...] -> is used to find based on condition it meand either one of them is match
     */
    const isUserAlreadyExist = await userModal.findOne({
        $or: [
            {username},
            {email},
        ]
    });


    if(isUserAlreadyExist){
        return res.status(404).json({
            message: "User already exist!"
        });
    }

    // Convert password into hash
    const hash = crypto.createHash("md5").update(password).digest('hex');
    

    

    // Create new user
    const user = await userModal.create({
        username,
        email,
        password: hash,
        bio,
        profileUrl,
    });

    const token = jwt.sign(
        {userId: user._id}, 
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );


    res.cookie("token", token);
    
    return res.status(200).json({
        message: "User Register Successfylly!",
    })


})


/**
 * POST -> login user
 * /api/auth/login
 */

authRouter.post('/login', async (req, res)=>{
    const {username, email, password} = req.body;

    /**
     * Find user exist or not based on condition
     */
    const user = await userModal.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(!user){
        return res.status(400).json({
            message: "User not exist"
        })
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    if(hashedPassword !== user.password){
        return res.status(404).json({
            message: "Invalied Password!",
        });
    }

    const token = jwt.sign({userId: user._id}, 
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in successfyllt",
        userData: {
            username: user.username,
            email: user.email,
            profileUrl: user.profileUrl,
            bio: user.bio,          
        }
    })

})


module.exports = authRouter;
const express = require('express');
const UserModal = require('../modals/user.modal');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;

    // Check Messing field or not
    if(!name || !email || !password){
        res.status(400).json({
            success: false,
            message: "One of the required field is messing!"
        })
    }

    // Check user already exist or not
    const isUserExist = await UserModal.findOne({email});
    if(isUserExist){
        return res.status(400).json({
            success: false,
            message: "User already exist with this email!"
        });
    }

    // Create new User
    const user = await UserModal.create({
        name,
        email, 
        password,
    });

    // Create Jwt token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

    // Save token to cookies in client side
    res.cookie("jwt_token", token);
    
    res.status(201).json({
        success: true,
        message: "User created successfully!",
        user,
        token,
    });
    

})

module.exports = authRouter;
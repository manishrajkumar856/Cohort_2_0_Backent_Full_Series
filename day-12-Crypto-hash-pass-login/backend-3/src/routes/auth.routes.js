const express = require('express');
const userModal = require('../modal/user.model');

const userRouter = express.Router();

/**
 * POST /api/auth/register 
 */
userRouter.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Some fields are messing"
        })
    }

    // Check user alredy exist 
    const isUserExist = await userModal.findOne({email:email});

    if(isUserExist){
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }

    // Create new user
    const newUser = await userModal.create({
        name,
        email,
        password
    });


    return res.status(200).json({
        message: "User Register Successfylly!",
        newUser,
    })


})



module.exports = userRouter;
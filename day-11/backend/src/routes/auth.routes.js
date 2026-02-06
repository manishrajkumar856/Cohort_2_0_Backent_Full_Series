const express = require("express");
const userModel = require("../modals/user.modal");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  // Check user already exist with this email or not
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      success: false,
      message: "User already exist with this email address!",
    });
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });


  // Create Token and check token -> go to JWT Decode.io website
  // To decode token -> Link: https://www.bing.com/ck/a?!&&p=c09864696ebb81a3a25a3fd3dadbbd23fe4c8abdf5f37dbb2b2cd4a144423293JmltdHM9MTc3MDI0OTYwMA&ptn=3&ver=2&hsh=4&fclid=2060642e-03cd-65fe-037e-72af027f642f&psq=jwt+cecode&u=a1aHR0cHM6Ly93d3cuand0LmlvLw

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );


  /*
  Cookie
    Cookei has direct connection to server, server can manipulate, write and 
    read cookies data and cookie has access to the server

    To use cookie -> npm i cookie-parser
  */

  // Set Cookie
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "New user created!",
    user,
    token
  });
});

module.exports = authRouter;

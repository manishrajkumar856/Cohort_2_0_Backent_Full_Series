require('dotenv').config();         // Needed to use .env file
const mongoose = require("mongoose");
// Connect to DB
const connectToDB = ()=>{
    console.log(process.env.MONGO_URI);
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected Successfully! : ")
        })
        
    } catch (error) {
        console.log("Connection DB Failed! : ",error);
    }
}


module.exports = connectToDB;
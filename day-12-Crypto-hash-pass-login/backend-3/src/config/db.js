require('dotenv').config();
const mongoose = require("mongoose");


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then((res)=>{
        console.log("Mongodb connected!");
    })
}

module.exports = connectToDb;
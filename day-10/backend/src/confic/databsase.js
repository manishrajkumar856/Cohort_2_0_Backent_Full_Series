require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = ()=>{
    // mongoose.connect(process.env.MONGO_URI)
    // .then(()=>{
    //     console.log("Mongo DB connect successfully!");
    // })


    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongo DB connect successfully!");
    })
}

module.exports = connectDB;


// mongodb+srv://ManishRaj:<db_password>@cluster0.z5ucbnw.mongodb.net/

//  mongodb+srv://ankur:NfYdJcRacYMDSHrO@cluster0.hyskdpp.mongodb.net/Gana
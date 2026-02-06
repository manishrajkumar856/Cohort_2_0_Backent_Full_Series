require('dotenv').config();
const mongoose = require('mongoose');


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then( (res) =>{
        console.log("Mongo DB connected successfully!....");
    })
    .catch((err)=>{
        console.log("Mongo DB connection failed with ERROR: ", err);
    })
}


module.exports = connectToDB;
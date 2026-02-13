require('dotenv').config();
const mongoose = require('mongoose');

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(res =>{
        console.log("Mongodb Connect Successfylly!");
    })
    .catch((err)=>{
        console.log("Error: "+err);
    })
}

module.exports = connectToDb;
require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(res => {
        console.log("Mongodb connect successfully!")
    })
    .catch((err)=>{
        console.log("Error: "+err);
    })
}

module.exports = connectToDB;
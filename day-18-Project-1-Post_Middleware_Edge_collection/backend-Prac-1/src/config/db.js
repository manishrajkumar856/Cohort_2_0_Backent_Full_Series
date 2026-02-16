require('dotenv').config();
const mongoose = require('mongoose');


async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected successfylly!");
    } catch (error) {
        console.log("MongoDb Error! ",error);
    }
}

module.exports = connectToDb;
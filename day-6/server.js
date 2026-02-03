/*
Server ko start karna

Database ko connect karna
*/

const mongoose = require('mongoose');
const app = require('./src/app');


// Connect ot DB
const connectToDB = ()=>{
    mongoose.connect("mongodb+srv://Manish:wgYNfwvUgxrG5eBR@cohort2.ujtdnmg.mongodb.net/Cohort-day-6")
    .then(()=>{
        console.log("Connected to Database!");
    })
}

// Connected to DB
connectToDB();

// Running the Server 
app.listen(3000, ()=>{
    console.log("Server is running on port 3000....");
})


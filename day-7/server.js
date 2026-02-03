const app = require('./src/app');
const connectToDB = require("./src/config/database");


connectToDB();

app.listen(3000, ()=>{
    console.log("Server running at PORT 3000....");
})

// MVpDw9folwFFnSvX

// mongodb+srv://ManishRaj:MVpDw9folwFFnSvX@cluster0.z5ucbnw.mongodb.net/
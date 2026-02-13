const app = require('./src/app');
const connectToDb = require('./src/config/db');


// Mongo Connection 
connectToDb();

//Lestening to the server
app.listen(3000, ()=>{
    console.log("Server running at post 3000....");
})
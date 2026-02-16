const app = require('./src/app');
const connectToDb = require('./src/config/db');


// Connect to mongodb 
connectToDb();

//Running Server 
app.listen(3000, ()=>{
    console.log("Server running at post 3000....");
})
const app = require('./src/app');
const connectDB = require('./src/confic/databsase');





connectDB();


app.listen(3000, ()=>{
    console.log("Server running at port 3000...");
})
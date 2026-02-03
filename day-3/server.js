const express = require('express');
const app = express();

app.use(express.json());            // To read data send by client or browser without this server cant read data send by brower like req.body

const notes = [
    {
        title: "Test  title 1",
        description: "This is title 1"
    }
]

// fro sending resources to the server 
app.post('/notes', (req, res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("Notes Created!");
})


// for getting resources form the server
app.get('/notes', (req,res)=>{
    res.send(notes);
})




app.listen(3000, ()=>{
    console.log("Server is running at localhost 3000");
});




// An API (Application Programming Interface) is a set of rules and protocols that enables two different software programs or systems to communicate and exchange data with each other.








// Rest Api
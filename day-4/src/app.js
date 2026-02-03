const express = require('express');
const app = express();  // Create a server

// Notes 
const notes = [

]

// Middleware 
app.use(express.json()); // To read req.body


/*
Get
*/
app.get('/', (req, res)=>{
    res.send("Hello World");
})


/*
Post
*/
app.post('/notes', (req, res)=>{
    console.log(req.body);
    notes.push(req.body);

    console.log(notes)
    res.send("Notes Cread!")
})

app.get('/notes', (req, res)=>{
    res.send(notes);
})


/*
Delete 
*/
app.delete('/notes/:index', (req, res)=>{
    // Params (req.params) - Dynamic routes
    delete notes [req.params.index];
    console.log(req.params.index);
})

/*
PATCH -> Partial Update
*/
app.patch('/notes/:index', (req, res)=>{
    notes[req.params.index] = req.body.desription;
    res.send('Update Successfully!');
});

module.exports = app;


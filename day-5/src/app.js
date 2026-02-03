const express = require("express");
const app = express();

const notes = [];

// For req.boxy to read json
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello Worlds");
})

app.post('/notes', (req, res)=>{
    console.log(req.body);

    // 201 -> For sending resources.
    res.status(201).json({
        message: "Notes Created Successfully"
    })
})

// Get -> 200 for success message
app.get('/notes', (req, res)=>{
    res.status(200).json({
        notes: notes,
    })
})

// 

module.exports = app;
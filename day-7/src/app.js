const express = require("express");
const app = express();
const notesModel = require("./models/notes.model");


// Middleware
app.use(express.json());

/*
- POST / notes
*/
app.post('/notes', async (req, res)=>{
    const { title, description } = req.body;
    console.log(req.body);

    try {
        const notes = await notesModel.create({
            title,
            description,
        })

        return res.status(201).json({
            success: true,
            message: "Notes Created Successfully!",
            notes: notes,
        })
    } catch (error) {
        console.log(error);
    }
});



module.exports = app;
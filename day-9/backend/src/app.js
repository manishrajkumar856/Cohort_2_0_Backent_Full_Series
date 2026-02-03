const express = require('express');
const NotesModel = require('./modals/notes.model');
const cors = require('cors');


const app = express();


// Enable from all sourse
app.use(cors());


// To get data From req.body
app.use(express.json());



/*

POST/ api/notes
- Create new node and save data in data base
- req.body = {title, description}

*/




app.post('/api/notes/', async (req, res)=>{
    const {title, description} = req.body;

    const notes = await NotesModel.create({
        title,
        description,
    })

    // 201 -> for creating new resources
    res.status(201).json({
        success: true,
        message: "Notes created successfully!",     
    })

})


/*
* -> GET /api/notes
* -> fetct all the notes data from mongodb and send them in the response
*/
app.get('/api/notes', async (req, res)=>{

    const notes = await NotesModel.find();

    res.status(200).json({
        success: true,
        message: "Notes fetched successfully!",
        notes: notes
    })
})

/*
* -> DELETE /api/notes/:id
* -> Deltete Notes By id we get id from req.params
*/


app.delete('/api/notes/:id', async (req, res)=>{
    const id = req.params.id;
    console.log("Id : ",id);

    await NotesModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Note deleted successfully"
    })
})


/**
 * Patch /api/notes/:id
 * -> Update the description of notes
 * -> req.body = {description}
 */

app.patch('/api/notes/:id', async (req, res)=>{
    const id = req.params.id;
    const {description} = req.body;

    await NotesModel.findByIdAndUpdate(id, {description});

    res.status(200).json({
        message: "Notes updated successfully!"
    })
})

module.exports = app;
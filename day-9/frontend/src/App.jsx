import React from "react";
import { useState } from "react";
import axios from 'axios';

const App = () => {


  const [getNotes, setNotes] = useState([
    {
      title: "Notes 1",
      description: "This is Notes 1",
    },
    {
      title: "Notes 2",
      description: "This is Notes 1",
    },
    {
      title: "Notes 3",
      description: "This is Notes 1",
    },
    {
      title: "Notes 4",
      description: "This is Notes 1",
    },
    {
      title: "Notes 5",
      description: "This is Notes 1",
    },
  ]);

  axios.get('http://localhost:3000/api/notes/').then((res)=>{
    setNotes(res.data.notes);
  })

  return (
    <div className="notes">
      {getNotes.map((data) => (
          <div className="note">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
      ))}
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [getNotes, setNotes] = useState([]);

  function fetchNotes(){
    axios.get("https://cohort-2-0-backent-full-series.onrender.com/api/notes/").then((res) => {
      setNotes(res.data.notes);
      console.log(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);


  function handleSubmit(e){
    e.preventDefault();
    const {title, description} = e.target.values;

    console.log(e.target.values);
    console.log(title, description);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="notes-create-form">
      <input type="text" className="title" name="title" placeholder="Enter title" />
      <input type="text" className="description" name="description" placeholder="Enter description" />
      <button type="submit">Create Notes</button>
    </form>

    <div className="notes">
      {getNotes.map((data) => (
        <div className="note">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default App;

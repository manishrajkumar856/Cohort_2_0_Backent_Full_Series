import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [getNotes, setNotes] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [getInputValue, setInputValue] = useState({
    title: "",
    description: "",
  });

  // Handle onChange
  function handleChange(e) {
    setInputValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  // Fetching all notes
  function fetchNotes() {
    axios
      .get("https://cohort-2-0-backent-full-series.onrender.com/api/notes/")
      .then((res) => {
        setNotes(res.data.notes);
        console.log(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Creating new notes and create and update logic
  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    //  Notes
    if (isUpdate) {
      // Update Notes
      console.log(currentId, title, description);
      axios
        .patch(
          `https://cohort-2-0-backent-full-series.onrender.com/api/notes/${currentId}`,
          {
            description: description.value,
          },
        )
        .then((res) => {
          console.log(res.data);
          setCurrentId(null);
          setIsUpdate(false);
          setInputValue({
            title: "",
            description: "",
          });
          fetchNotes();
        });
    }
    // Create New Notes
    else {
      axios
        .post(
          "https://cohort-2-0-backent-full-series.onrender.com/api/notes/",
          {
            title: title.value,
            description: description.value,
          },
        )
        .then((res) => {
          console.log(res.data);
          fetchNotes();
          setInputValue({
            title: "",
            description: "",
          });
        });
    }
  }

  // Delete Notes By Id
  function handleDeleteNotes(id) {
    axios
      .delete(
        `https://cohort-2-0-backent-full-series.onrender.com/api/notes/${id}`,
      )
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  // Update a notes
  function handleUpdatesNotes(data) {
    setIsUpdate(true);
    setCurrentId(data._id);
    setInputValue({
      title: data.title,
      description: data.description,
    });
  }

  return (
    <>
      <div className="heading">
        <h1>Create your notes</h1>
      </div>
      <form onSubmit={handleSubmit} className="notes-create-form">
        <input
          onChange={handleChange}
          type="text"
          className="title inp"
          name="title"
          value={getInputValue.title}
          placeholder="Enter title"
        />
        <input
          onChange={handleChange}
          type="text"
          className="description inp"
          name="description"
          value={getInputValue.description}
          placeholder="Enter description"
        />
        {isUpdate ? (
          <button className="btn update-btn2" type="submit">
            Update Notes
          </button>
        ) : (
          <button className="btn create-note-btn" type="submit">
            Create new note
          </button>
        )}
      </form>

      <div className="notes">
        {getNotes.map((data) => (
          <div className="note">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className="btn-sec">
              <button
                onClick={() => handleDeleteNotes(data._id)}
                className="btn del-btn"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdatesNotes(data)}
                className="btn update-btn"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

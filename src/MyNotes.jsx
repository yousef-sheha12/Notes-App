import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const editTitle = useRef();
  const editNote = useRef();
  const [editNoteIndex, setEditNoteIndex] = useState();

  const deleteNote = (index) => {
    const saved = JSON.parse(localStorage.getItem("myNotes") || "[]");
    saved.splice(index, 1);
    localStorage.setItem("myNotes", JSON.stringify(saved));
    setNotes(saved);
  };

  const openModal = (index) => {
    setEditNoteIndex(index);
    setEditIndex(true);
    setTimeout(() => {
      let oldData = notes[index];
      editTitle.current.value = oldData.title;
      editNote.current.value = oldData.note;
    }, 0);
  };

  const updateNote = () => {
    let updatedNotes = [...notes];
    updatedNotes[editNoteIndex] = {
      title: editTitle.current.value,
      note: editNote.current.value,
    };
    setNotes(updatedNotes);
    setEditIndex(false);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myNotes") || "[]");
    setNotes(saved);
  }, []);

  return (
    <div className="w-full flex flex-col h-dvh p-5">
      {notes.map((el, index) => {
        return (
          <div key={index} className="w-full bg-gray-400  p-4">
            <div className="card bg-base-100  shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{el.title}</h2>
                <p>{el.note}</p>
                <p className="text-red-200">{el.date}</p>
              </div>
              <div className="flex justify-center gap-4 p-3">
                <button
                  className="btn btn-info"
                  onClick={() => openModal(index)}
                >
                  edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => deleteNote(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {editIndex && (
        <div className="modal modal-open">
          <div className="modal-box w-80">
            <h3 className="font-bold text-lg">Edit Note</h3>

            <input
              className="input input-bordered w-full mt-3"
              ref={editTitle}
              placeholder="Title"
            />

            <textarea
              className="textarea textarea-bordered w-full mt-3"
              ref={editNote}
              placeholder="Edit Note"
            />

            <div className="modal-action">
              <button className="btn btn-primary" onClick={updateNote}>
                Update
              </button>
              <button className="btn" onClick={() => setEditIndex(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {notes.length == 0 && (
        <div className="items-center flex justify-center text-red-500 mt-10">
          No notes yet. Create your first note above.
        </div>
      )}

      <Link to="/" className="flex justify-center items-center">
        <button className="btn btn-error  mt-5">
          Back to Add another Note
        </button>
      </Link>
    </div>
  );
};

export default MyNotes;

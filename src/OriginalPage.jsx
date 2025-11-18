import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const OriginalPage = () => {
  const [notes, setNotes] = useState([]);
  const titleInput = useRef();
  const noteInput = useRef();
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(false);
  const editTitle = useRef();
  const editNote = useRef();
  const [editNoteIndex, setEditNoteIndex] = useState();
  const addToMynotes = (note) => {
    const saved = JSON.parse(localStorage.getItem("myNotes")) || [];
    saved.push(note);
    localStorage.setItem("myNotes", JSON.stringify(saved));
    navigate("/mynotes");
  };

  const addNote = () => {
    let newNote = {
      title: titleInput.current.value,
      note: noteInput.current.value,
    };
    let copy = [...notes, newNote];
    setNotes(copy);
    titleInput.current.value = "";
    noteInput.current.value = "";
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

  return (
    <div className="w-full shadow rounded h-vh flex flex-col justify-center items-center p-4">
      <nav className="w-full flex gap-2 p-4 justify-between">
        <h1 className="text-2xl">Notes</h1>
        <div>
          <Link to="/mynotes">
            <button className="btn btn-primary">My Notes</button>
          </Link>
        </div>
      </nav>

      <div className="bg-white w-[90%] h-[95%]">
        <div className="w-full flex flex-col gap-3 p-4 justify-center items-center">
          <input
            ref={titleInput}
            type="text"
            className="input "
            placeholder="Title"
          />
          <input
            ref={noteInput}
            type="text"
            className="input  p-10"
            placeholder="Write Your Note"
          />
          <button className="btn btn-success" onClick={addNote}>
            + Add Note
          </button>
        </div>
        {notes.map((el, index) => {
          return (
            <div key={index} className="w-full  p-4">
              <div className="card bg-base-100  shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">{el.title}</h2>
                  <p>{el.note}</p>
                </div>
                <div className="flex justify-center gap-4 p-3">
                  <button
                    className="btn btn-info"
                    onClick={() => openModal(index)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToMynotes(el)}
                  >
                    Add To My Notes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {notes.length === 0 && (
          <div className="items-center flex justify-center text-red-500 mt-5">
            No notes yet. Create your first note above.
          </div>
        )}

        {editIndex && (
          <div className="modal modal-open">
            <div className="modal-box w-100">
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
      </div>
    </div>
  );
};

export default OriginalPage;

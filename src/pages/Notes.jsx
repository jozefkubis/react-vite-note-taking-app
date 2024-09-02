import "./Notes.css"
import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { IoIosClose } from "react-icons/io"
import { IoIosAddCircle } from "react-icons/io"
import { FaCircle } from "react-icons/fa6"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useDeleteNote } from "../hooks/useDeleteNote"
import useDragAndDrop from "../hooks/useDragAndDrop"

function Notes() {
  const {
    notes,
    setNotes,
    folders,
    setFolders,
    searchQuery,
    notesAfterSearch,
  } = useNoteTakingProvider()

  const { noteId } = useParams()

  const navigate = useNavigate()

  // MARK: useEffect na nacitanie poznamok z localStorage
  useLocalStorage(setFolders, setNotes)

  // MARK: Funkcie

  // funkcia na vymazanie poznamky
  function changeNoteColor(id, color) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, backgroundColor: color } : note
    )
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  // Vyhladanie kategorie pri zhode folder.id a noteId - useParams()
  const filteredFolder = folders.find(
    (folder) => folder.id === parseInt(noteId)
  )

  // Podmieneny nazov kategorie - filteredFolder.name ulozeny do currentFolderName
  const currentFolderName = filteredFolder
    ? filteredFolder.name
    : "Unknown Folder"

  // Vyfiltrovanie poznamok pri zhode note.folderId a noteId - useParams()
  const filteredNotes = notes.filter(
    (note) => note.folderId === parseInt(noteId)
  )

  // Navigacia na newNote
  function clickToNewNote() {
    navigate("/newNote")
  }

  // Funkcia na vymazanie poznamky
  const { noteDelete } = useDeleteNote()

  // MARK: Drag and Drop------------------------------------------------------------------------------
  const { handleDragStart, handleDragEnter, handleDragEnd } = useDragAndDrop(
    filteredNotes,
    setNotes,
    "notes"
  )
  // MARK:--------------------------------------------------------------------------------------------

  const notesToShow = searchQuery ? notesAfterSearch : filteredNotes

  return (
    <div className="notes-container">
      <div className="notes-name-add">
        <h2>{currentFolderName} 📝 Notes</h2>
        <IoIosAddCircle onClick={clickToNewNote} style={{ fontSize: "30px" }} />
      </div>
      <br />

      <div className="oneNoteDiv">
        {notesToShow.length > 0
          ? notesToShow.map((note, index) => (
              <div
                className="oneNote"
                key={note.id}
                style={{
                  backgroundColor: note.backgroundColor,
                  cursor: "pointer",
                }}
                // MARK: Drag and Drop
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
              >
                <div className="noteHeader">
                  <div className="noteColors">
                    {[
                      "var(--color-background--1)",
                      "var(--color-background--2)",
                      "var(--color-background--3)",
                      "var(--color-background--4)",
                    ].map((color) => (
                      <FaCircle
                        key={color}
                        style={{ fill: color }}
                        onClick={() => changeNoteColor(note.id, color)}
                      />
                    ))}
                  </div>
                  <div className="noteCloseCross">
                    <IoIosClose onClick={() => noteDelete(note.id)} />
                  </div>
                </div>
                <div className="noteDateTime">
                  <p style={{ fontSize: "11px" }}>
                    {note.date}{" "}
                    <span style={{ fontSize: "10px" }}>{note.time}</span>
                  </p>
                </div>
                <h4 className="noteName">{note.name}</h4>
                <p className="noteText">{note.text}</p>
                <a href={`https://${note.link}`} target="_blank">
                  {note.link}
                </a>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Notes

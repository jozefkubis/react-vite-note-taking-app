import "./Notes.css"
import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { IoIosClose } from "react-icons/io"
import { IoIosAddCircle } from "react-icons/io"
import { FaCircle } from "react-icons/fa6"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useDeleteNote } from "../hooks/useDeleteNote"
import { useState } from "react"

function Notes() {
  const { notes, setNotes, folders, setFolders } = useNoteTakingProvider()
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [dragging, setDragging] = useState(null)

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
  const handleDragStart = (e, index) => {
    setDragging(index)
    e.dataTransfer.effectAllowed = "move"
  }

  // Handle Drag Enter
  const handleDragEnter = (e, index) => {
    // const draggedOverItem = filteredNotes[index]

    if (dragging === index) return

    let items = [...filteredNotes]
    items.splice(dragging, 1)
    items.splice(index, 0, filteredNotes[dragging])

    setDragging(index)
    setNotes(items)
  }

  // Handle Drag End - Ulozenie zmien do localStorage
  const handleDragEnd = () => {
    setDragging(null)

    // uozenie zmeneneho poradia do localStorage
    localStorage.setItem("notes", JSON.stringify(notes))
  }

  //   MARK:--------------------------------------------------------------------------------------------

  return (
    <div className="notes-container">
      <div className="notes-name-add">
        <h2>{currentFolderName} Notes</h2>
        <IoIosAddCircle onClick={clickToNewNote} style={{ fontSize: "30px" }} />
      </div>
      <br />

      <div className="oneNoteDiv">
        {filteredNotes.length > 0
          ? filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className="oneNote"
                style={{
                  backgroundColor: note.backgroundColor,
                  cursor: "pointer",
                }}
                // MARK: Drag and Drop
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
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
                <h3 className="noteName">{note.name}</h3>
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

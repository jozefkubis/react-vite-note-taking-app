import "./Notes.css"
import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"
import { IoIosAddCircle } from "react-icons/io"
import { FaCircle } from "react-icons/fa6"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useDeleteNote } from "../hooks/useDeleteNote"

function Notes() {
  const { notes, setNotes, folders, setFolders } = useNoteTakingProvider()

  // MARK:  useParams()
  const { noteId } = useParams()

  const navigate = useNavigate()

  // MARK:  useEffect na nacitanie poznamok z localStorage
  // useEffect(() => {
  //   const loadLocalStorage = () => {
  //     const savedNotes = localStorage.getItem("notes")

  //     if (savedNotes) {
  //       const parsedNotes = JSON.parse(savedNotes)
  //       const updatedNotes = parsedNotes.map((note) => ({
  //         ...note,
  //         backgroundColor: note.backgroundColor || "rgb(231, 231, 145)",
  //       }))

  //       setNotes(updatedNotes)
  //     }
  //   }
  //   loadLocalStorage()
  // }, [setNotes])

  // MARK: useEffect na nacitanie kategorii z localStorage
  useLocalStorage(setFolders, setNotes)

  // MARK: Funkcie a filtre

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

  // function noteDelete(note) {
  //   const newNotes = notes.filter((n) => n.id !== note.id)
  //   localStorage.setItem("notes", JSON.stringify(newNotes))
  //   setNotes(newNotes)
  // }

  const { noteDelete } = useDeleteNote()

  return (
    <div className="notes-container">
      <div className="notes-name-add">
        <h2>{currentFolderName} Notes</h2>
        <IoIosAddCircle onClick={clickToNewNote} style={{ fontSize: "30px" }} />
      </div>
      <br />

      <div className="oneNoteDiv">
        {filteredNotes.length > 0
          ? filteredNotes.map((note) => (
              <div
                key={note.id}
                className="oneNote"
                style={{
                  backgroundColor: note.backgroundColor,
                  cursor: "pointer",
                }}
              >
                <div className="noteHeader">
                  <div className="noteColors">
                    <FaCircle
                      style={{ fill: "var(--color-background--1)" }}
                      onClick={() =>
                        changeNoteColor(note.id, "var(--color-background--1)")
                      }
                    />
                    <FaCircle
                      style={{ fill: "var(--color-background--2)" }}
                      onClick={() =>
                        changeNoteColor(note.id, "var(--color-background--2)")
                      }
                    />
                    <FaCircle
                      style={{ fill: "var(--color-background--3)" }}
                      onClick={() =>
                        changeNoteColor(note.id, "var(--color-background--3)")
                      }
                    />
                    <FaCircle
                      style={{ fill: "var(--color-background--4)" }}
                      onClick={() =>
                        changeNoteColor(note.id, "var(--color-background--4)")
                      }
                    />
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

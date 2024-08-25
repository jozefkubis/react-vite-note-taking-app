import "./Notes.css"
import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"
import Button from "../components/Button"
import { IoIosClose } from "react-icons/io"

function Notes() {
  const { notes, setNotes, folders } = useNoteTakingProvider()
  const { noteId } = useParams()

  const navigate = useNavigate()

  // MARK:  useEffect na nacitanie poznamok z localStorage
  useEffect(() => {
    const loadLocalStorage = () => {
      const savedNotes = localStorage.getItem("notes")

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    }
    loadLocalStorage()
  }, [setNotes])

  // MARK: Funkcie a filtre

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
  function noteDelete(note) {
    const newNotes = notes.filter((n) => n.id !== note.id)
    localStorage.setItem("notes", JSON.stringify(newNotes))
    setNotes(newNotes)
  }

  return (
    <div className="notes-container">
      <h3>Current Folder: {currentFolderName}</h3>
      <br />

      <div className="oneNoteDiv">
        {filteredNotes.length > 0
          ? filteredNotes.map((note) => (
              <div key={note.id} className="oneNote">
                <div className="noteDateTime">
                  <p style={{ fontSize: "11px" }}>
                    {note.date}{" "}
                    <span style={{ fontSize: "10px" }}>{note.time}</span>
                  </p>
                  <IoIosClose onClick={() => noteDelete(note)} />
                </div>
                <h4>{note.name}</h4>
                <p>{note.text}</p>
                <a href={`https://${note.link}`} target="_blank">
                  {note.link}
                </a>
              </div>
            ))
          : null}
      </div>

      <Button onClick={clickToNewNote}>New Note</Button>
    </div>
  )
}

export default Notes

import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"

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

  // Navigacia na folderList
  function handleClick() {
    navigate("/")
  }

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
    <div className="notesDiv">
      <h3>Current Folder: {currentFolderName}</h3>
      <br />

      <div>
        {filteredNotes.length > 0
          ? filteredNotes.map((note) => (
              <div key={note.id}>
                <h4>{note.name}</h4>
                <p>{note.text}</p>
                <a href={`https://${note.link}`} target="_blank">
                  {note.link}
                </a>
                <button className="noteDelete" onClick={() => noteDelete(note)}>
                  ❌
                </button>
              </div>
            ))
          : null}
      </div>

      <button onClick={handleClick}>Back to Folders</button>
      <br />
      <button onClick={clickToNewNote}>New Note</button>
    </div>
  )
}

export default Notes

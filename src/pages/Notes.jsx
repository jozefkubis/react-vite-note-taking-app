import { useNavigate, useParams } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"

function Notes() {
  const { notes, setNotes } = useNoteTakingProvider()
  const { noteId } = useParams()

  useEffect(() => {
    const loadLocalStorage = () => {
      const savedNotes = localStorage.getItem("notes")

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    }
    loadLocalStorage()
  }, [setNotes])

  const filteredNotes = notes.filter(
    (note) => note.folderId === parseInt(noteId)
  )

  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }

  function clickToNewNote() {
    navigate("/newNote")
  }

  function noteDelete(note) {
    const newNotes = notes.filter((n) => n.id !== note.id)
    localStorage.setItem("notes", JSON.stringify(newNotes))
    setNotes(newNotes)
  }

  return (
    <div className="notesDiv">
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

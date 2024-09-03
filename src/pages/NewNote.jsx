import "./NewNote.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useCapitalise } from "../hooks/useCapitalise"
// import { useEffect, useState } from "react"
// import NoFolderSelected from "../components/NoFolderSelected"
import Button from "../components/Button"

function NewNote() {
  const {
    noteTitle,
    setNoteTitle,
    noteText,
    setNoteText,
    link,
    setLink,
    noteSubmitForm,
    folders,
    selectedFolder,
  } = useNoteTakingProvider()

  const navigate = useNavigate()
  // const [isLoading, setIsLoading] = useState(true)

  // MARK: useEffects - ak su priecniky nacitane a selectedFolder je nastaveny
  // useEffect(() => {
  //   if (folders.length > 0 && selectedFolder !== null) {
  //     setIsLoading(false)
  //   }
  // }, [folders, selectedFolder])

  const capitalisedTitle = useCapitalise(noteTitle)

  // if (isLoading) {
  //   return <NoFolderSelected />
  // }

  // Vyfiltrovanie priecnikov podla id v selectedFolder a ulozenie do const filteredFolders
  const filteredFolders = folders.filter(
    (folder) => folder.id === selectedFolder
  )

  // Funkcia na zapisanie novych poznamok do localStorage - NoteTakingProvider
  const handleSubmit = (e) => {
    e.preventDefault()
    if (filteredFolders.length > 0 && noteTitle !== "") {
      noteSubmitForm(e)
      navigate(`/notes/${filteredFolders[0].id}`)
    } else {
      console.error("No folder selected or folders not loaded.")
      alert("Fill in all fields.")
    }
  }

  return (
    <div className="newNote-container">
      <form className="form-newNote" onSubmit={handleSubmit}>
        <div className="noteTitleDiv">
          <label htmlFor="noteTitle">Note Name</label>
          <input
            type="text"
            id="noteTitle"
            name="noteTitle"
            value={capitalisedTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
        <div className="noteTextDiv">
          <label htmlFor="noteText">Text</label>
          <textarea
            type="text"
            id="noteText"
            name="noteText"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            maxLength={150}
          />
        </div>
        <div className="linkDiv">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}

export default NewNote

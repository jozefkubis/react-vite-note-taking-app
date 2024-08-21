import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useCapitalise } from "../hooks/useCapitalise"
import { useEffect, useState } from "react"

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if folders are loaded and selectedFolder is set
    if (folders.length > 0 && selectedFolder !== null) {
      setIsLoading(false)
    }
  }, [folders, selectedFolder])

  const capitalisedTitle = useCapitalise(noteTitle)

  if (isLoading) {
    return <div>Loading...</div> // Or some other loading indicator
  }

  console.log(folders)

  const filteredFolders = folders.filter(
    (folder) => folder.id === selectedFolder
  )

  console.log(filteredFolders)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (filteredFolders.length > 0) {
      noteSubmitForm(e)
      navigate(`/notes/${filteredFolders[0].id}`)
    } else {
      console.error("No folder selected or folders not loaded.")
      navigate("/")
    }
  }

  return (
    <div className="newFolder-container">
      <form className="form-newFolder" onSubmit={handleSubmit}>
        <div className="titleDiv">
          <label htmlFor="noteTitle">New Note Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={capitalisedTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
        <div className="folderNameDiv">
          <label htmlFor="noteText">Text</label>
          <textarea
            type="text"
            id="noteText"
            name="noteText"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
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
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewNote

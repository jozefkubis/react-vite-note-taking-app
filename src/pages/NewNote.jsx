import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

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

  const filteredFolders = folders.filter(
    (folder) => folder.id === selectedFolder
  )

  console.log(folders)

  const handleSubmit = (e) => {
    e.preventDefault()
    noteSubmitForm(e)
    navigate(`/notes/${filteredFolders[0].id}`)
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
            value={noteTitle}
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

import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function NewFolder() {
  const {
    submitForm,
    title,
    setTitle /* folderName, setFolderName, link, setLink */,
  } = useNoteTakingProvider()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm(e)
    navigate("/")
  }

  return (
    <div className="newFolder-container">
      <form className="form-newFolder" onSubmit={handleSubmit}>
        <div className="titleDiv">
          <label htmlFor="title">New Folder Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <div className="folderNameDiv">
          <label htmlFor="folderName">Body</label>
          <textarea
            type="text"
            id="folderName"
            name="folderName"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
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
        </div> */}
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewFolder

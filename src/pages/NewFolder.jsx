import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useCapitalise } from "../hooks/useCapitalise"

function NewFolder() {
  const { folderSubmitForm, folderTitle, setFolderTitle } =
    useNoteTakingProvider()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    folderSubmitForm(e)
    navigate("/")
  }

  return (
    <div className="newFolder-container">
      <form className="form-newFolder" onSubmit={handleSubmit}>
        <div className="titleDiv">
          <label htmlFor="folderTitle">New Folder Name</label>
          <input
            type="text"
            id="title"
            name="folderTitle"
            value={useCapitalise(folderTitle)}
            onChange={(e) => setFolderTitle(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewFolder

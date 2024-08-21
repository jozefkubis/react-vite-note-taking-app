import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useCapitalise } from "../hooks/useCapitalise"

function NewFolder() {
  const { folderSubmitForm, folderTitle, setFolderTitle } =
    useNoteTakingProvider()

  const navigate = useNavigate()

  // MARK: Funkcia na posielanie novych kategorii..........................................
  const handleSubmit = (e) => {
    e.preventDefault()
    folderSubmitForm(e)
    navigate("/")
  }

  const capitalisedTitle = useCapitalise(folderTitle)

  return (
    <div className="newFolder-container">
      <form className="form-newFolder" onSubmit={handleSubmit}>
        <div className="titleDiv">
          <label htmlFor="folderTitle">New Folder Name</label>
          <input
            type="text"
            id="title"
            name="folderTitle"
            value={capitalisedTitle}
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

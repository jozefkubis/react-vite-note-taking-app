import "./NewFolder.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useCapitalise } from "../hooks/useCapitalise"
import Button from "../components/Button"
// import { FaCircle } from "react-icons/fa6"

function NewFolder() {
  const {
    folderSubmitForm,
    folderTitle,
    setFolderTitle,
    // setBackgroundColor,
    // backgroundColor,
  } = useNoteTakingProvider()

  const navigate = useNavigate()

  // MARK: Funkcia na zapisanie novych kategorii do localStorage - NoteTakingProvider
  const handleSubmit = (e) => {
    e.preventDefault()

    if (folderTitle !== "") {
      folderSubmitForm(e)
      navigate("/")
    } else {
      console.error("Missing folder name.")
      alert("Missing folder name.")
    }
  }

  const capitalisedTitle = useCapitalise(folderTitle)

  return (
    <div className="newFolder-container">
      <form className="form-newFolder" onSubmit={handleSubmit}>
        <div className="folderTitleDiv">
          <label htmlFor="folderTitle">New Folder Name</label>
          <input
            type="text"
            id="folderTitle"
            name="folderTitle"
            value={capitalisedTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
          />
        </div>

        <div className="btn-div">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

export default NewFolder

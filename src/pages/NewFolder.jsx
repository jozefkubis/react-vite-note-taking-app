import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function NewFolder() {
  const { submitForm, title, setTitle } = useNoteTakingProvider()

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

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default NewFolder

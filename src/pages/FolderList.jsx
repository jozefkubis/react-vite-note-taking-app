import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function FolderList() {
  const { folders, notes } = useNoteTakingProvider()

  const navigate = useNavigate()

  return (
    <>
      <div onClick={() => navigate("/newNote")}>
        {folders
          ? folders.map((folder) => (
              <div key={folder.id}>
                <h4>{folder.name}</h4>
                <p>{notes.length}</p>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default FolderList

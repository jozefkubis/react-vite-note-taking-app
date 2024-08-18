import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function FolderList() {
  const { folders, notes, setSelectedFolder } = useNoteTakingProvider()

  const navigate = useNavigate()

  return (
    <>
      <div>
        {folders.map((folder) => (
          <div key={folder.id}>
            <h4>
              {folder.name}{" "}
              <span
                onClick={() => {
                  setSelectedFolder(folder.id)
                  navigate("/newNote")
                }}
              >
                ➕
              </span>
            </h4>
            <p onClick={() => navigate(`/notes/${folder.id}`)}>
              Num of notes:{" "}
              {notes.filter((note) => note.folderId === folder.id).length}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default FolderList

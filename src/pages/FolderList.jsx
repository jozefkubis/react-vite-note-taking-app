import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"

function FolderList() {
  const { folders, notes, setNotes, setSelectedFolder, setFolders } =
    useNoteTakingProvider()

  const navigate = useNavigate()

  useEffect(() => {
    const loadLocalStorage = () => {
      const savedFolders = localStorage.getItem("folders")
      const savedNotes = localStorage.getItem("notes")

      if (savedFolders) {
        setFolders(JSON.parse(savedFolders))
      }

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    }

    loadLocalStorage()
  }, [setFolders, setNotes])

  function deleteFolder(id) {
    const newFolders = folders.filter((folder) => folder.id !== id)
    localStorage.setItem("folders", JSON.stringify(newFolders))
    setFolders(newFolders)

    const newNotes = notes.filter((note) => note.folderId !== id)
    localStorage.setItem("notes", JSON.stringify(newNotes))
    setNotes(newNotes)
  }

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
            <button
              className="folderDelete"
              onClick={() => deleteFolder(folder.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default FolderList

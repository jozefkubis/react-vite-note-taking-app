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
        {folders.map((folder, index) => (
          <div key={folder.id}>
            <h4>
              <span className="folderNumber">{index + 1}.</span> {folder.name}{" "}
              <span
                onClick={() => {
                  setSelectedFolder(folder.id)
                  navigate("/newNote")
                }}
              >
                ➕
              </span>
            </h4>
            <p
              onClick={() => {
                if (
                  notes.filter((note) => note.folderId === folder.id).length > 0
                ) {
                  navigate(`/notes/${folder.id}`)
                } else {
                  alert("This folder is empty")
                }
              }}
              style={{
                cursor:
                  notes.filter((note) => note.folderId === folder.id).length > 0
                    ? "pointer"
                    : "default",
              }}
            >
              {notes.filter((note) => note.folderId === folder.id).length > 0
                ? `Num of notes: ${
                    notes.filter((note) => note.folderId === folder.id).length
                  }`
                : "Emnty folder"}
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

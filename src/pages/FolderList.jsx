import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"

function FolderList() {
  const {
    folders,
    notes,
    setNotes,
    setSelectedFolder,
    setFolders,
    selectedFolder,
  } = useNoteTakingProvider()

  const navigate = useNavigate()

  // MARK:  useEffect na nacitanie kategorrii a poznamok z localStorage
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

  // MARK: funkcia na vymazanie kategorii
  function deleteFolder(id) {
    const newFolders = folders.filter((folder) => folder.id !== id)
    localStorage.setItem("folders", JSON.stringify(newFolders))
    setFolders(newFolders)

    const newNotes = notes.filter((note) => note.folderId !== id)
    localStorage.setItem("notes", JSON.stringify(newNotes))
    setNotes(newNotes)

    if (selectedFolder === id) {
      localStorage.removeItem("selectedFolder")
      setSelectedFolder(null)
    }
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
                  setSelectedFolder(folder.id) // ulozime id kategorii "folder.id" do selectedFolder
                  navigate("/newNote")
                }}
                style={{ cursor: "pointer" }}
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
                : "Emty folder"}
            </p>

            <button
              className="folderDelete"
              onClick={() => deleteFolder(folder.id)}
              style={{ cursor: "pointer" }}
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

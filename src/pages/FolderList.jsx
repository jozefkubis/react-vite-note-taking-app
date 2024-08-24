import "./FolderList.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"
import Button from "../components/Button"

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

  // funkcia pre odkaz na novu poznamku
  function handleClick(id) {
    setSelectedFolder(id)
    navigate("/newNote")
  }

  return (
    <>
      <div>
        {folders.map((folder, index) => (
          <div key={folder.id}>
            <div className="folderInfo">
              <h4>
                <span className="folderNumber">{index + 1}.</span> {folder.name}{" "}
              </h4>
              <p onClick={() => handleClick(folder.id)}>➕</p>
            </div>
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

            <p onClick={() => deleteFolder(folder.id)}>❌</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default FolderList

import "./FolderList.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useEffect } from "react"
// import Button from "../components/Button"
import { IoIosAddCircle } from "react-icons/io"
import { MdDeleteForever } from "react-icons/md"
import { FaCircle } from "react-icons/fa6"

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
        const parsedFolders = JSON.parse(savedFolders)
        // Ak v folderoch nie je backgroundColor, nastavíme ho na defaultnú hodnotu
        const updatedFolders = parsedFolders.map((folder) => ({
          ...folder,
          backgroundColor: folder.backgroundColor || "rgb(231, 231, 145)",
        }))
        setFolders(updatedFolders)
      }

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    }

    loadLocalStorage()
  }, [setFolders, setNotes])

  // Funkci na aktualizaciu farby kategorii
  function changeFolderColor(id, color) {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, backgroundColor: color } : folder
    )
    setFolders(updatedFolders)
    localStorage.setItem("folders", JSON.stringify(updatedFolders))
  }

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
    <div className="folderList-container">
      <div className="folderList">
        {folders.map((folder, index) => (
          <div
            key={folder.id}
            className="oneFolder"
            style={{
              backgroundColor: folder.backgroundColor,
              cursor: "pointer",
            }}
          >
            <div>
              <FaCircle
                style={{ fill: "var(--color-background--1)" }}
                onClick={() =>
                  changeFolderColor(folder.id, "var(--color-background--1)")
                }
              />
              <FaCircle
                style={{ fill: "var(--color-background--2)" }}
                onClick={() =>
                  changeFolderColor(folder.id, "var(--color-background--2)")
                }
              />
              <FaCircle
                style={{ fill: "var(--color-background--3)" }}
                onClick={() =>
                  changeFolderColor(folder.id, "var(--color-background--3)")
                }
              />
              <FaCircle
                style={{ fill: "var(--color-background--4)" }}
                onClick={() =>
                  changeFolderColor(folder.id, "var(--color-background--4)")
                }
              />
            </div>
            <div className="folderInfo">
              <h3>
                <span className="folderNumber">{index + 1}.</span> {folder.name}{" "}
              </h3>

              <div>
                <IoIosAddCircle onClick={() => handleClick(folder.id)} />
              </div>
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
                : "Empty folder"}
            </p>
            <div className="folderDelete">
              <MdDeleteForever onClick={() => deleteFolder(folder.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FolderList

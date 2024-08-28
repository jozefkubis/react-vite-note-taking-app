import "./FolderList.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useDeleteFolder } from "../hooks/useDeleteFolder"
import { IoIosAddCircle } from "react-icons/io"
import { MdDeleteForever } from "react-icons/md"
import { FaCircle } from "react-icons/fa6"

function FolderList() {
  const { folders, setFolders, setNotes, setSelectedFolder, notes } =
    useNoteTakingProvider()
  const navigate = useNavigate()
  useLocalStorage(setFolders, setNotes)
  const { deleteFolder } = useDeleteFolder()

  const changeFolderColor = (id, color) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, backgroundColor: color } : folder
    )
    setFolders(updatedFolders)
    localStorage.setItem("folders", JSON.stringify(updatedFolders))
  }

  const handleClick = (id) => {
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
            <div className="folderColors">
              {[
                "var(--color-background--1)",
                "var(--color-background--2)",
                "var(--color-background--3)",
                "var(--color-background--4)",
              ].map((color) => (
                <FaCircle
                  key={color}
                  style={{ fill: color }}
                  onClick={() => changeFolderColor(folder.id, color)}
                />
              ))}
            </div>
            <div className="folderInfo">
              <h3>
                <span className="folderNumber">{index + 1}.</span> {folder.name}
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
            <MdDeleteForever onClick={() => deleteFolder(folder.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FolderList

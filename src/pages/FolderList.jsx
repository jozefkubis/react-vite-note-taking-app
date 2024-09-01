import "./FolderList.css"
import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useDeleteFolder } from "../hooks/useDeleteFolder"
import { IoIosAddCircle } from "react-icons/io"
import { IoIosClose } from "react-icons/io"
import { FaCircle } from "react-icons/fa6"
import useDragAndDrop from "../hooks/useDragAndDrop"

function FolderList() {
  const { folders, setFolders, setNotes, setSelectedFolder, notes } =
    useNoteTakingProvider()

  const navigate = useNavigate()

  // MARK: useEffect na nacitanie poznamok z localStorage
  useLocalStorage(setFolders, setNotes)

  // MARK: Funkcie

  // funkcia na vymazanie kategorii
  const { deleteFolder } = useDeleteFolder()

  // funkcia na zmenenie farby kategorii
  const changeFolderColor = (id, color) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, backgroundColor: color } : folder
    )
    setFolders(updatedFolders)
    localStorage.setItem("folders", JSON.stringify(updatedFolders))
  }

  // funkcia na kliknutie na kategoriu
  const handleClick = (id) => {
    setSelectedFolder(id)
    navigate("/newNote")
  }

  // MARK: Drag and Drop------------------------------------------------------------------------------
  const { handleDragStart, handleDragEnter, handleDragEnd } = useDragAndDrop(
    folders,
    setFolders,
    "folders"
  )
  // MARK:--------------------------------------------------------------------------------------------

  return (
    <div className="folderList-container">
      <div className="folderList">
        {folders.length === 0 ? (
          <h1 className="createFolder">🖋 Create Folder to continue...</h1>
        ) : (
          folders.map((folder, index) => (
            <div
              key={folder.id}
              className="oneFolder"
              style={{
                backgroundColor: folder.backgroundColor,
                cursor: "pointer",
              }}
              // MARK: Drag and Drop
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            >
              <div className="folderTop">
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

                <div className="folderDelete">
                  <IoIosClose onClick={() => deleteFolder(folder.id)} />
                </div>
              </div>
              <div className="folderInfo">
                <h4>
                  <span className="folderNumber">{index + 1}.</span>{" "}
                  {folder.name}
                </h4>
                <div>
                  <IoIosAddCircle onClick={() => handleClick(folder.id)} />
                </div>
              </div>
              <p
                onClick={() => {
                  if (
                    notes.filter((note) => note.folderId === folder.id).length >
                    0
                  ) {
                    navigate(`/notes/${folder.id}`)
                  } else {
                    alert("This folder is empty")
                  }
                }}
                style={{
                  cursor:
                    notes.filter((note) => note.folderId === folder.id).length >
                    0
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
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FolderList

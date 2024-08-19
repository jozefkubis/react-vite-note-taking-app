import { createContext, useState } from "react"
import PropTypes from "prop-types"

const NoteTakingContext = createContext()

function NoteTakingProvider({ children }) {
  const [folderTitle, setFolderTitle] = useState("")
  const [folderName, setFolderName] = useState("")
  const [link, setLink] = useState("")
  const [folders, setFolders] = useState([])
  const [noteTitle, setNoteTitle] = useState("")
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null)

  function folderSubmitForm(e) {
    e.preventDefault()

    const newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: folderTitle,
    }

    console.log(newFolder.id)

    localStorage.setItem("folders", JSON.stringify([...folders, newFolder]))
    setFolderTitle("")
  }

  function noteSubmitForm(e) {
    e.preventDefault()

    const newNote = {
      id: Math.floor(Math.random() * 1000),
      name: noteTitle,
      text: noteText,
      link: link,
      folderId: selectedFolder,
    }

    localStorage.setItem("notes", JSON.stringify([...notes, newNote]))
    setNoteTitle("")
    setNoteText("")
    setLink("")

    console.log(newNote.folderId)
    console.log(newNote.id)
  }

  return (
    <NoteTakingContext.Provider
      value={{
        folderTitle,
        setFolderTitle,
        folderName,
        setFolderName,
        link,
        setLink,
        folders,
        setFolders,
        folderSubmitForm,
        noteTitle,
        setNoteTitle,
        noteText,
        setNoteText,
        notes,
        setNotes,
        noteSubmitForm,
        selectedFolder,
        setSelectedFolder,
      }}
    >
      {children}
    </NoteTakingContext.Provider>
  )
}

NoteTakingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { NoteTakingProvider, NoteTakingContext }

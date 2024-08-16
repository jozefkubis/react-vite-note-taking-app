import { createContext, useState } from "react"
import PropTypes from "prop-types"

const NoteTakingContext = createContext()

function NoteTakingProvider({ children }) {
  const [title, setTitle] = useState("")
  const [folderName, setFolderName] = useState("")
  const [link, setLink] = useState("")
  const [folders, setFolders] = useState([])
  const [noteTitle, setNoteTitle] = useState("")
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState([])
  const [currentFolderId, setCurrentFolderId] = useState(null)

  function submitForm(e) {
    e.preventDefault()

    const newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: title,
    }

    setFolders([...folders, newFolder])
    setTitle("")
    setCurrentFolderId(newFolder.id)

    console.log(newFolder)
  }

  function noteSubmitForm(e) {
    e.preventDefault()

    const newNote = {
      id: currentFolderId,
      name: noteTitle,
      text: noteText,
      link: link,
    }

    setNotes([...notes, newNote])
    setNoteTitle("")
    setNoteText("")
    setLink("")

    console.log(newNote)
  }

  return (
    <NoteTakingContext.Provider
      value={{
        title,
        setTitle,
        folderName,
        setFolderName,
        link,
        setLink,
        folders,
        setFolders,
        submitForm,
        noteTitle,
        setNoteTitle,
        noteText,
        setNoteText,
        notes,
        setNotes,
        noteSubmitForm,
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

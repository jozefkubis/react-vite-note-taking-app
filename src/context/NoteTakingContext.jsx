import { createContext, useEffect, useState } from "react"
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
  const [selectedFolder, setSelectedFolder] = useState(null)

  // useEffect(() => {
  //   const loadLocalStorage = () => {
  //     const savedFolders = localStorage.getItem("folders")
  //     const savedNotes = localStorage.getItem("notes")

  //     if (savedFolders) {
  //       setFolders(JSON.parse(savedFolders))
  //     }

  //     if (savedNotes) {
  //       setNotes(JSON.parse(savedNotes))
  //     }
  //   }
  //   loadLocalStorage()
  // }, [])

  function submitForm(e) {
    e.preventDefault()

    const newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: title,
    }

    localStorage.setItem("folders", JSON.stringify([...folders, newFolder]))
    setTitle("")
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

    console.log(notes)
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

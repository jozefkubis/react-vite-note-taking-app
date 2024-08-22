import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

const NoteTakingContext = createContext()

function NoteTakingProvider({ children }) {
  const [folderTitle, setFolderTitle] = useState("")
  const [folderName, setFolderName] = useState("")
  const [link, setLink] = useState("")
  const [folders, setFolders] = useState([])
  const [notes, setNotes] = useState([])
  const [noteTitle, setNoteTitle] = useState("")
  const [noteText, setNoteText] = useState("")
  const [selectedFolder, setSelectedFolder] = useState(null)

  // MARK: useEffects..........................................

  // Uloženie selectedFolder do localStorage pri jeho zmene
  useEffect(() => {
    if (selectedFolder !== null) {
      localStorage.setItem("selectedFolder", JSON.stringify(selectedFolder))
    }
  }, [selectedFolder])

  // Načítanie selectedFolder z localStorage pri prvom načítaní
  useEffect(() => {
    const savedSelectedFolder = localStorage.getItem("selectedFolder")
    if (savedSelectedFolder) {
      setSelectedFolder(JSON.parse(savedSelectedFolder))
    }
  }, [])

  // Načítanie folders a notes z localStorage pri prvom načítaní
  useEffect(() => {
    const savedFolders = localStorage.getItem("folders")
    const savedNotes = localStorage.getItem("notes")

    if (savedFolders) {
      setFolders(JSON.parse(savedFolders))
    }

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // MARK: Funkcie..........................................

  // Funkcia na odoslanie novych kategorii do localStorage
  function folderSubmitForm(e) {
    e.preventDefault()

    const newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: folderTitle,
    }

    const updatedFolders = [...folders, newFolder]
    localStorage.setItem("folders", JSON.stringify(updatedFolders))
    setFolders(updatedFolders)
    setFolderTitle("")
  }

  // Vytvorenie aktualneho datumu
  // const date = new Date().toLocaleDateString("en-EU")

  const currentDate = new Date()
  const hour = currentDate.getHours()
  const minute = currentDate.getMinutes()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const time = `${hour}:${minute}`
  const date = `${day}.${month}.${year}`

  // Funkcia na odoslanie novych poznamok do localStorage
  function noteSubmitForm(e) {
    e.preventDefault()

    const newNote = {
      id: Math.floor(Math.random() * 1000),
      name: noteTitle,
      text: noteText,
      link: link,
      date: date,
      time: time,
      folderId: selectedFolder,
    }

    const updatedNotes = [...notes, newNote]
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
    setNoteTitle("")
    setNoteText("")
    setLink("")
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

// MARK: PropTypes - Vlastnosti komponentu NoteTakingProvider
NoteTakingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { NoteTakingProvider, NoteTakingContext }

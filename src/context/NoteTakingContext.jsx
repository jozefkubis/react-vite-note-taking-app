import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useLocalStorage } from "../hooks/useLocalStorage"
// import { BsHandbagFill } from "react-icons/bs"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFolders, setFilteredFolders] = useState([])

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
  useLocalStorage(setFolders, setNotes)

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

  function handleChangeSearch(e) {
    e.preventDefault()

    setSearchQuery(e.target.value)

    const filtered = folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredFolders(filtered)
  }

  // Vytvorenie aktualneho datumu
  const currentDate = new Date()
  const hour = currentDate.getHours()
  const minute = currentDate.getMinutes()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const time = `${hour}:${minute < 10 ? "0" + minute : minute}`
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
        filteredFolders,
        handleChangeSearch,
        searchQuery,
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

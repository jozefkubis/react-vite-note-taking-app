import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

export const useDeleteFolder = () => {
  const {
    folders,
    setFolders,
    notes,
    setNotes,
    setSelectedFolder,
    selectedFolder,
  } = useNoteTakingProvider()

  const deleteFolder = (id) => {
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

  return { deleteFolder }
}

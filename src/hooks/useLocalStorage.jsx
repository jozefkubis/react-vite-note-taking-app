import { useEffect } from "react"

export const useLocalStorage = (setFolders, setNotes) => {
  useEffect(() => {
    const loadLocalStorage = () => {
      const savedFolders = localStorage.getItem("folders")
      const savedNotes = localStorage.getItem("notes")

      if (savedFolders) {
        const parsedFolders = JSON.parse(savedFolders)
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
}

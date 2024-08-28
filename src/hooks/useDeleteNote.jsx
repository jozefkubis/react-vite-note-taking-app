import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

export function useDeleteNote() {
  const { notes, setNotes } = useNoteTakingProvider()

  function noteDelete(id) {
    const newNotes = notes.filter((n) => n.id !== id)
    localStorage.setItem("notes", JSON.stringify(newNotes))
    setNotes(newNotes)
  }

  return { noteDelete }
}

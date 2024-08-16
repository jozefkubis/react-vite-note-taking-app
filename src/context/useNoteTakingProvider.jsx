import { useContext } from "react"
import { NoteTakingContext } from "./noteTakingContext"

function useNoteTakingProvider() {
  const context = useContext(NoteTakingContext)
  if (context === undefined) {
    throw new Error(
      "useNoteTakingProvider must be used within a NoteTakingProvider"
    )
  }
  return context
}

export { useNoteTakingProvider }

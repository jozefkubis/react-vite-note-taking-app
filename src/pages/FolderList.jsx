import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"
import Notes from "./Notes"

function HomePage() {
  const { folders } = useNoteTakingProvider()

  const navigate = useNavigate()

  return (
    <>
      <div onClick={() => navigate("/newNote")}>
        {folders
          ? folders.map((folder) => (
              <div key={folder.id}>
                <h4>{folder.name}</h4>
              </div>
            ))
          : null}
        <Notes />
      </div>
    </>
  )
}

export default HomePage

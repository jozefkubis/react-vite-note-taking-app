import { useNavigate } from "react-router-dom"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function HomePage() {
  const { folders, notes } = useNoteTakingProvider()

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
      </div>
      <div>
        {notes
          ? notes.map((note) => (
              <div key={note.id}>
                <h4>{note.name}</h4>
                <p>{note.text}</p>
                <a href={`https://${note.link}`} target="_blank">
                  {note.link}
                </a>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default HomePage

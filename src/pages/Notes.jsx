import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function Notes() {
  const { notes } = useNoteTakingProvider()

  return (
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
  )
}

export default Notes

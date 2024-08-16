import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function HomePage() {
  const { folders } = useNoteTakingProvider()

  return (
    <div>
      {folders
        ? folders.map((folder) => (
            <div key={folder.id}>
              <h4>{folder.name}</h4>
              <p>{folder.folder}</p>
              <a href={`https://${folder.link}`} target="_blank">
                {folder.link}
              </a>
            </div>
          ))
        : null}
    </div>
  )
}

export default HomePage

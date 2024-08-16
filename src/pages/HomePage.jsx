import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function HomePage() {
  const { tags } = useNoteTakingProvider()

  return (
    <div>
      {tags
        ? tags.map((tag) => (
            <div key={tag.id}>
              <h4>{tag.name}</h4>
              <p>{tag.tag}</p>
              <a href={`https://${tag.link}`} target="_blank">
                {tag.link}
              </a>
            </div>
          ))
        : null}
    </div>
  )
}

export default HomePage

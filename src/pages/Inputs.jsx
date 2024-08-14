import { useState } from "react"

function Inputs() {
  const [title, setTitle] = useState("")
  const [oneTag, setOneTag] = useState("")
  const [link, setLink] = useState("")
  const [tags, setTags] = useState([])

  function submitForm(e) {
    e.preventDefault()

    const newTag = {
      id: Math.floor(Math.random() * 1000),
      name: title,
      tag: oneTag,
      link: link,
    }

    setTags([...tags, newTag])
    setTitle("")
    setOneTag("")
    setLink("")
  }

  console.log(tags)

  return (
    <div className="inputs-container">
      <form className="form-inputs" onSubmit={submitForm}>
        <div className="titleDiv">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="tagDiv">
          <label htmlFor="oneTag">Tags</label>
          <textarea
            type="text"
            id="oneTag"
            name="oneTag"
            value={oneTag}
            onChange={(e) => setOneTag(e.target.value)}
          />
        </div>
        <div className="linkDiv">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Add
        </button>
      </form>

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
    </div>
  )
}

export default Inputs

import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function Inputs() {
  const {
    submitForm,
    title,
    setTitle,
    oneTag,
    setOneTag,
    link,
    setLink,
    tags,
  } = useNoteTakingProvider()

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
    </div>
  )
}

export default Inputs

import { createContext, useState } from "react"
import PropTypes from "prop-types"

const NoteTakingContext = createContext()

function NoteTakingProvider({ children }) {
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

  return (
    <NoteTakingContext.Provider
      value={{
        title,
        setTitle,
        oneTag,
        setOneTag,
        link,
        setLink,
        tags,
        setTags,
        submitForm,
      }}
    >
      {children}
    </NoteTakingContext.Provider>
  )
}

NoteTakingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { NoteTakingProvider, NoteTakingContext }

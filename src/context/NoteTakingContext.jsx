import { createContext, useState } from "react"
import PropTypes from "prop-types"

const NoteTakingContext = createContext()

function NoteTakingProvider({ children }) {
  const [title, setTitle] = useState("")
  const [folderName, setFolderName] = useState("")
  const [link, setLink] = useState("")
  const [folders, setFolders] = useState([])

  function submitForm(e) {
    e.preventDefault()

    const newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: title,
      tag: folderName,
      link: link,
    }

    setFolders([...folders, newFolder])
    setTitle("")
    setFolderName("")
    setLink("")
  }

  return (
    <NoteTakingContext.Provider
      value={{
        title,
        setTitle,
        folderName,
        setFolderName,
        link,
        setLink,
        folders,
        setFolders,
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

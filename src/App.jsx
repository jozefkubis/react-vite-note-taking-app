import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import NewFolder from "./pages/NewFolder"
import FolderList from "./pages/FolderList"
import NewNote from "./pages/NewNote"
import Notes from "./pages/Notes"
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<FolderList />} />
        <Route path="/newFolder" element={<NewFolder />} />
        <Route path="/newNote" element={<NewNote />} />
        <Route path="/notes/:noteId" element={<Notes />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default App

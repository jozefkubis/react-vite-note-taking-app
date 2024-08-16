import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import NewFolder from "./pages/NewFolder"
import FolderList from "./pages/FolderList"
import NewNote from "./pages/NewNote"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<FolderList />} />
        <Route path="/newFolder" element={<NewFolder />} />
        <Route path="/newNote" element={<NewNote />} />
      </Route>
    </Routes>
  )
}

export default App

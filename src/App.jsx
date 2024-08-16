import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import NewFolder from "./pages/NewFolder"
import FolderList from "./pages/FolderList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<FolderList />} />
        <Route path="/newFolder" element={<NewFolder />} />
      </Route>
    </Routes>
  )
}

export default App

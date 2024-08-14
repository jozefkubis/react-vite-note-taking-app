import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import Inputs from "./pages/Inputs"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/inputs" element={<Inputs />} />
      </Route>
    </Routes>
  )
}

export default App

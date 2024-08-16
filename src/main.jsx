import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { NoteTakingProvider } from "./context/noteTakingContext.jsx"

createRoot(document.getElementById("root")).render(
  <NoteTakingProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NoteTakingProvider>
)

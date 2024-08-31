import PageNav from "./PageNav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="appLayout">
      <PageNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout

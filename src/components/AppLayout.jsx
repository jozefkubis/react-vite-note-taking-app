import PageNav from "./PageNav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="appLayout">
      <PageNav />
      <div className="layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout

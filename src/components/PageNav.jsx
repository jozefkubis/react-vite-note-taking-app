import { NavLink } from "react-router-dom"
import "./PageNav.css"

export const PageNav = () => {
  return (
    <nav className="page-nav">
      <ul>
        <li>
          <NavLink to="/">All Folders</NavLink>
        </li>
        <li>
          <NavLink to="/newFolder">Create New Folder</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav

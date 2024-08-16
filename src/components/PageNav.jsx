import { NavLink } from "react-router-dom"
import "./PageNav.css"

export const PageNav = () => {
  return (
    <nav className="page-nav">
      <ul>
        <li>
          <NavLink to="/">Notes</NavLink>
        </li>
        <li>
          <NavLink to="/inputs">Create</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav

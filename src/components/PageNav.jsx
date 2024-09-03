import { NavLink } from "react-router-dom"
import "./PageNav.css"
import { IoIosAddCircle } from "react-icons/io"
import SearchInput from "./SearchInput"

export const PageNav = () => {
  return (
    <nav className="page-nav">
      <ul>
        <li>
          <NavLink to="/">📁 Folders</NavLink>
        </li>
        <li>
          <NavLink to="/newFolder">
            <IoIosAddCircle style={{ fontSize: "40px" }} />
          </NavLink>
        </li>
        <li>
          <SearchInput />
        </li>
      </ul>
    </nav>
  )
}

export default PageNav

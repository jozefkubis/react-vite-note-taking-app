import { NavLink } from "react-router-dom"
import "./PageNav.css"
import { IoIosAddCircle } from "react-icons/io"
import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

export const PageNav = () => {
  const { searchQuery, handleChangeSearch } = useNoteTakingProvider()

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
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleChangeSearch}
            className="searchInput"
          />
        </li>
      </ul>
    </nav>
  )
}

export default PageNav

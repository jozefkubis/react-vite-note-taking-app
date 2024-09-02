import { useNoteTakingProvider } from "../context/useNoteTakingProvider"

function SearchInput() {
  const { searchQuery, handleChangeSearch } = useNoteTakingProvider()

  return (
    <input
      type="search"
      name="search"
      placeholder="Search"
      value={searchQuery}
      onChange={handleChangeSearch}
      className="searchInput"
    />
  )
}

export default SearchInput

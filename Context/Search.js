import React, { useState } from 'react'

export const SearchContext = React.createContext({
  isSearch: false,
  searchValue: '',
})

const SearchContextProvider = props => {
  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  return (
    <SearchContext.Provider
      value={{
        isSearch,
        searchValue,
        setSearchValue,
        setIsSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider

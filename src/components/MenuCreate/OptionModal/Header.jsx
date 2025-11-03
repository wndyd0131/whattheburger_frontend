import React from 'react'
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div className="flex justify-center items-center h-[70px] bg-gradient-to-r from-amber-500 to-orange-500">
      <SearchBar/>
    </div>
  )
}

export default Header;
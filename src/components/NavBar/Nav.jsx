import React, { useState } from 'react'
import './nav.css'
import NavNotice from './NavNotice'
import NavMessage from './NavMessage'
import NavAvatar from './NavAvatar'
import SearchBar from '../SearchBar/SearchBar'
const Nav = () => {
  // Search code 
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    console.log(value,'valuessssss')
      setSearchValue(value);
  };
  return (
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
        <SearchBar placeholder="Search" onSearch={handleSearch}/>
            <NavNotice />
            {/* <NavMessage /> */}
            <NavAvatar />
            
        </ul>
    </nav>
  )
}

export default Nav

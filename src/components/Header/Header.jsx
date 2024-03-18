import React from 'react'
import './header.css';
import Logo from '../../components/Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import Nav from '../NavBar/Nav';
function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        {/* Logo */}
        <Logo />
        {/* {searchbar} */}
        <SearchBar />
        {/* {nav} */}
        <Nav />
    </header>
  )
}

export default Header

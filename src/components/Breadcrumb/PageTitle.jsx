import React from 'react'
import './pageTitle.css'
import Nav from '../NavBar/Nav'
import SearchBar from '../SearchBar/SearchBar'
function PageTitle({ page }) {
  return (
    <div className="pagetitle">
      <div className='heading'>
        <h1>{page}</h1>
        
        <Nav />
      </div>

      <div className='menu-nav' >
        <a href="/">
          <i className="bi bi-house-door breadcrumb-icon"></i>
        </a>
        <i className="bi bi-slash breadcrumb-icon">{page}</i>
      </div>


    </div>
  )
}

export default PageTitle

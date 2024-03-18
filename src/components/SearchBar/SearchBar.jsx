import React, { useState } from 'react'
import './searchBar.css'



function SearchBar({ placeholder, onSearch }) {
    
const [inputValue, setInputValue] = useState('');

const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value); // Callback to parent component
}

return (
    <div className='search-bar'>
        <form className='search-form d-flex align-items-center' method='POST' action='#'>
            <div className='position-relative'>
                <input
                    className='search-input'
                    type='text'
                    name='query'
                    placeholder={placeholder}
                    title='Enter search keyword'
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type='submit' title="Search" className='search-icon'>
                    <i className='bi bi-search'></i>
                </button>
            </div>
        </form>
    </div>
)
};

export default SearchBar

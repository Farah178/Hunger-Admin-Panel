import React, { useState } from 'react'
import './sideBar.css'
import logoIcon from '../../images/logo@2x.png';
import { NavLink, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const handleToggleSideBar = () => {
        console.log("===========")
        console.log(document.body.classList, 'document.body.classList')
        document.body.classList.toggle('toggle-sidebar');
    };
    const handleLogout = () => {
        navigate('/sign-in');
    };
    
    const handleDropdownClick = (dropdownId) => {
        setActiveDropdown(dropdownId)
    };

    return (
        <div>

            {/* <Logo /> */}
            <aside id="sidebar" className='sidebar'>
                <div className="sidebar-logo" >
                    <img
                        className="logo-icon"
                        loading="eager"
                        alt=""
                        src={logoIcon}
                    />

                </div>
                {/* <div>
                    <i className="bi bi-list toggle-sidebar-btn"
                    onClick={handleToggleSideBar}></i>
                </div> */}
                <ul className="sidebar-nav" id='sidebar-nav'>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeclassname="active" exact to="/" onClick={() => handleDropdownClick('Dashboard-nav')} >
                            <i className="bi bi-box"></i>
                            {/* <img src={dashboardLogo} /> */}
                            <span>Dashboard</span>
                        </NavLink>
                    </li>


                    <li className={`nav-item ${activeDropdown == "marketing-nav" ? 'active' : ''}`} >
                        <a className="nav-link collapsed"
                            data-bs-target='#marketing-nav'
                            data-bs-toggle='collapse'
                            href='#'
                            onClick={() => handleDropdownClick('marketing-nav')}
                        >
                            <i className="bi bi-volume-up"></i>
                            {/* <img src={MarketingLogo} /> */}
                            <span>Marketing</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>

                        <ul id='marketing-nav'
                            className='nav-content collapse'
                            data-bs-parent="#sidebar-nav"

                        >
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/marketing/overview" onClick={() => handleDropdownClick('marketing-nav')} >
                                    <span>Overview</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/marketing/email-message" onClick={() => handleDropdownClick('marketing-nav')}>
                                    <span>Email Messages</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/marketing/text-message" onClick={() => handleDropdownClick('marketing-nav')}>
                                    <span>Text Messages</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* Forms */}

                    <li className={`nav-item ${activeDropdown == "menu-nav" ? 'active' : ''}`} >
                        <a className="nav-link collapsed"
                            data-bs-target='#menu-nav'
                            data-bs-toggle='collapse'
                            href='#'
                            onClick={() => handleDropdownClick('menu-nav')}
                        >
                            <i className="bi bi-list"></i>
                            {/* <img src={menuLogo} /> */}
                            <span>Menu</span>

                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>

                        <ul id='menu-nav'
                            className='nav-content collapse'
                            data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/menu/all-menu" onClick={() => handleDropdownClick('menu-nav')}>

                                    <span>All Menus</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/menu/items" onClick={() => handleDropdownClick('menu-nav')}>

                                    <span>Items</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/menu/items-tags" onClick={() => handleDropdownClick('menu-nav')}>

                                    <span>Items Tags</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* Orders */}

                    <li className={`nav-item ${activeDropdown == "order-nav" ? 'active' : ''}`} >
                        <a className="nav-link collapsed"
                            data-bs-target='#orders-nav'
                            data-bs-toggle='collapse'
                            href='#'
                            onClick={() => handleDropdownClick('order-nav')}
                        >
                            {/* <img src={ordersLogo} /> */}
                            {/* <i className="bi bi-border-width"></i> */}
                            <i className="bi bi-layers"></i>
                            <span>Orders</span>

                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>

                        <ul id='orders-nav'
                            className='nav-content collapse'
                            data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/orders/all-orders" onClick={() => handleDropdownClick('order-nav')}>

                                    <span>All Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/orders/orders-settings" onClick={() => handleDropdownClick('order-nav')}>

                                    <span>Orders Settings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" activeclassname="active" exact to="/orders/report" onClick={() => handleDropdownClick('order-nav')}>

                                    <span>Report</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* Product Updates */}
                    <li className="nav-item" >
                        <NavLink className="nav-link" activeclassname="active" exact to="/product" onClick={() => handleDropdownClick('Products-nav')}>
                            <i className="bi bi-bell"></i>
                            <span>Products</span>
                            {/* <i className="bi bi-chevron-down ms-auto"></i> */}
                        </NavLink>
                    </li>

                    {/* Gallery */}

                    <li className="nav-item">
                        <NavLink className="nav-link" activeclassname="active" exact to="/gallery" onClick={() => handleDropdownClick('gallery-nav')}>
                            <i className="bi bi-images"></i>
                            {/* <img src={gallery} /> */}
                            <span>Gallery</span>
                            {/* <i className="bi bi-chevron-down ms-auto"></i> */}
                        </NavLink>
                    </li>

                    {/* Settings */}

                    <li className="nav-item">
                        <NavLink className="nav-link" activeclassname="active" exact to="/settings" onClick={() => handleDropdownClick('settings-nav')}>
                            <i className="bi bi-gear"></i>
                            <span>Settings</span>
                            {/* <i className="bi bi-chevron-down ms-auto"></i> */}
                        </NavLink>

                    </li>
                </ul>

                <div className="logout-button">
                    <button className="btn btn-outline-light"
                    onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                </div>
            </aside>
        </div>



    )
}

export default SideBar

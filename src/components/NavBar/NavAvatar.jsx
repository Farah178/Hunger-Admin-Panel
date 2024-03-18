import React from 'react'
import profileImg from '../../images/user.jpg'
import { useSelector } from 'react-redux';
const NavAvatar = () => {
    const cuserData = useSelector(state => state.data.admin_profile_data);

    return (
        <li className='nav-item dropdown pe-3'>
            <a className='nav-link nav-profile d-flex align-items-center pe-0'
                href='#'
                data-bs-toggle="dropdown">
                <img src={cuserData?.profile_img || profileImg} alt='Profile' className='rounded-circle'></img>
                {/* <span className='d-none d-md-block dropdown-toggle ps-2'>Esha</span> */}
            </a>

            <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
                <li className='dropdown-header'>
                    <h6>Esha</h6>
                    <span>Web Developer</span>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li>
                    <a
                        className='dropdown-item d-flex align-items-center'
                        href='users-profile.html'>

                        <i className='bi bi-person'></i>
                        <span>My Profile</span>
                    </a>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li>
                    <a
                        className='dropdown-item d-flex align-items-center'
                        href='users-profile.html'>

                        <i className='bi bi-gear'></i>
                        <span>Account Settings</span>
                    </a>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li>
                    <a
                        className='dropdown-item d-flex align-items-center'
                        href='users-profile.html'>

                        <i className='bi bi-circle'></i>
                        <span>Need Help</span>
                    </a>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li>
                    <a className='dropdown-item d-flex align-items-center' href='#'>
                        <i className='bi bi-box-arrow-right'></i>
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
        </li>
    )
}

export default NavAvatar

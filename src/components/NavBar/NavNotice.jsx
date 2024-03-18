import React from 'react'

const NavNotice = () => {
    return (
        <li className='nav-item dropdown'>
            <a className='nav-link nav-icon' href="#" data-bs-toggle="dropdown">
                <li className='bi bi-bell bell-icon'></li>
                <span className='badge badge-number'>4</span>
            </a>

            <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
                <li className='dropdown-header'>
                    You have 4 new notifications
                    <a href='#'>
                        <span className='badge rounded-pill bg-primary p-2 m-2'>
                            View all
                        </span>
                    </a>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>

                <li className='notification-item'>
                    <i className='bi bi-exclaimation-circle text-warning'></i>
                    <div>
                        <h4>Loream Ipsum</h4>
                        <p>Quae doloreanm earum varitatis oditseno</p>
                        <p>30 min. ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider'></hr>
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-danger'></i>
                    <div>
                        <h4>Loream Ipsum</h4>
                        <p>Quae doloreanm earum varitatis oditseno</p>
                        <p>1 min. ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider'></hr>
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-success'></i>
                    <div>
                        <h4>Loream Ipsum</h4>
                        <p>Quae doloreanm earum varitatis oditseno</p>
                        <p>2 min. ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider'></hr>
                </li>

                <li className='notification-item'>
                    <i className='bi bi-x-circle text-primary'></i>
                    <div>
                        <h4>Loream Ipsum</h4>
                        <p>Quae doloreanm earum varitatis oditseno</p>
                        <p>4 hr. ago</p>
                    </div>
                </li>

                <li>
                    <hr className='dropdown-divider'></hr>
                </li>
                <li className='dropdown-footer'>
                        <a href="#">Show all notification</a>
                </li>
                

            </ul>
        </li>
    )
}

export default NavNotice

import React from 'react'
import './logo.css'
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import logoIcon from '../../images/logo@2x.png';


function Logo() {
    const navigate = useNavigate;
    const handleToggleSideBar = () => {
        console.log("===========")
        console.log(document.body.classList, 'document.body.classList')
        document.body.classList.toggle('toggle-sidebar');
    };
    const onLogoImageClick = useCallback(() => {
        navigate("/");
    }, []);

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <a href="/" className='logo d-flex align-items-center'>
                <div className="logo-wrapper" onClick={onLogoImageClick}>
                    <img
                        className="logo-icon"
                        loading="eager"
                        alt=""
                        src={logoIcon}
                    />
                </div>
                {/* <span className='d-none d-lg-block'>AdminDashboard</span> */}

            </a>
            <i className="bi bi-list toggle-sidebar-btn"
                onClick={handleToggleSideBar}></i>
        </div>
    );
}

export default Logo;

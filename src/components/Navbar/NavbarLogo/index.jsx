import React from 'react';
import logo from '../../../assets/images/dashboard-logo.png';
import './NavbarLogo.css';

function NavbarLogo() {
    
    return (
        <div className='navbar-logo-container'>
            <img
                className='NavbarLogo'
                src={logo}
                alt='Assisttu Logo'
            />
        </div>
    );
}

export { NavbarLogo };

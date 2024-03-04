import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { NavbarLogo } from './NavbarLogo';
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

function Navbar() {

    return (
        <React.Fragment>
            <div className='navbar'>
                <div className='left-navbar'>
                    <Link to='/'>
                    <NavbarLogo />
                    </Link>
                </div>
                <div className='right-navbar'>
            
                </div>
            </div>
        </React.Fragment>
    );
}

export { Navbar };

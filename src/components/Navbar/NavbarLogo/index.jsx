import React, { useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import logo from '../../../assets/images/dashboard-logo.png';
import './NavbarLogo.css';
const MySwal = withReactContent(Swal);

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

import React, { useContext, useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useHistory, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

import { Sidebar } from '../sidebar';
import { Navbar } from '../Navbar';
import { userMainOptions } from '../../constants/userMainOptions';
import { CustomizedSnackbar } from '../Shared/Snackbar';

import { GlobalContext } from '../../context/GlobalContext';
import { AiFillProject } from 'react-icons/ai';

import './MainPage.css';

const INACTIVITY_TIMEOUT = 300000; // 5 minutos en milisegundos
const MySwal = withReactContent(Swal);

function MainPage() {

    const { userRole, setActivePage, setToken, setEmailGlobal, setIdUserGlobal, setUserName, setShowNotificationsBadge, activeBlur, setActiveBlur, planesUsuario } = useContext(GlobalContext)
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [activePopUpLogOut, setActivePopUpLogOut] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const history = useHistory();
    const { component } = useParams();

    useEffect(()=>{
        setActiveBlur(false);
    },[])

    const mainOptions = () => {
        return userMainOptions;
    };

    const options = [...mainOptions()];

    const SnackbarRef = useRef();

    useEffect(()=> {
        setActivePage(component)
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
          };
      
          // Attach the event listener to the window
          window.addEventListener('resize', handleResize);
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    },[component])

    return (
        <div className="main-page">
            <CustomizedSnackbar
                open={SnackbarRef.open}
                severity={SnackbarRef.snackbarType}
                message={SnackbarRef.snackbarMessage}
                handleClose={SnackbarRef.handleClose}
                ref={SnackbarRef}
            />
            <Navbar />
            <div className="content-wrapper">
                <Sidebar
                    mainOptions={mainOptions()}
                    onLogoutClick={() => console.log('loggedout')}
                />
                {options.map(
                    option => option.name === component
                        ? <div className={`main-content ${option.name} ${ activeBlur && "blur-class" }`} key={option.name}>{option.component}</div>
                        : null
                )
                }
            </div>
        </div>
    );
}

export { MainPage };
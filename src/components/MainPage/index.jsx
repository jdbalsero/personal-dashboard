import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Sidebar } from '../sidebar';
import { Navbar } from '../Navbar';
import { userMainOptions } from '../../constants/userMainOptions';
import { GlobalContext } from '../../context/GlobalContext';

import './MainPage.css';

function MainPage() {

    const { setActivePage, activeBlur, setActiveBlur } = useContext(GlobalContext)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { component } = useParams();

    useEffect(()=>{
        setActiveBlur(false);
    },[])

    const mainOptions = () => {
        return userMainOptions;
    };

    const options = [...mainOptions()];

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
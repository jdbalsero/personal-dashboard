import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { ListSidebar } from './ListSidebar';
import './ListSidebar/ListSidebar.css'
import './Sidebar.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { GlobalContext } from '../../context/GlobalContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import menu from "../../assets/images/menu.png"

const MySwal = withReactContent(Swal);

function Sidebar(props) {

    let { mainOptions,  onLogoutClick } = props;
    mainOptions = mainOptions.filter(option => option.show === true);

    const history = useHistory();
    const { activePage, setToken, setEmailGlobal, setIdUserGlobal, setUserName, showSupportBadge, setShowSupportBadge, showAdminBadge, setShowAdminBadge,  setActiveBlur} = useContext(GlobalContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
    })

    useEffect(() => {
        if (screenWidth < 600)
            window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isCollapsed]);

    const handleOutsideClick = (e) => {
        const clickedElement = e.target;

        // Get the ID of the clicked element
        const elementId = clickedElement.id;

        if (elementId!='toggleSidebarButton' && !(isCollapsed) ) {
            toggleSidebar();
        }
    };

    const handleOptionClick = (option) => {
        history.push(`/${option}`);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <React.Fragment>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className={`upper-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <ListSidebar
                        className={`ListSidebar MainListSidebar ${isCollapsed ? 'collapsed' : ''}`}
                        options={mainOptions}
                        selectedOption={activePage}
                        onOptionClick={handleOptionClick}
                        isCollapsed={isCollapsed}
                        showBadge={showAdminBadge}
                    />
                </div>
                <div className='lower-sidebar'>
                  
                </div>

                <div className='collapse-button-container' >
                    <button className='collapse-button' onClick={toggleSidebar} >
                        {screenWidth > 600 ? (!isCollapsed ?
                            <IoIosArrowDropleftCircle
                                className='collapse-icon'
                                color='#A4A4A4'
                            />
                            :
                            <IoIosArrowDroprightCircle
                                className='collapse-icon'
                                color='#A4A4A4'
                            />
                        ) : (isCollapsed ? <img
                            src={menu}
                            id='toggleSidebarButton'
                            className='collapse-icon'
                            color='#A4A4A4'
                            alt="Open Sidebar"
                        /> : <></>)}
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export { Sidebar };
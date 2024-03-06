import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

function PageProvider(props) {
    const [activePage, setActivePage] = useState(() => {
        // Initialize activePage from localStorage or set a default value
        const savedActivePage = localStorage.getItem('activePage');
        return savedActivePage || 'Home';
    });

    const [activeBlur, setActiveBlur] = useState(() => {
        // Initialize activeBlur from localStorage or set a default value
        const savedActiveBlur = localStorage.getItem('activeBlur');
        return savedActiveBlur || '';
    });


    useEffect(() => {
        // Save state values to localStorage whenever they change
        localStorage.setItem('activePage', activePage);
        localStorage.setItem('activeBlur', activeBlur);
    }, [activePage, activeBlur]);

    return (
        <GlobalContext.Provider
            value={{
                activePage,
                setActivePage,
                activeBlur,
                setActiveBlur,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, PageProvider };



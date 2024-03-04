// PrivateRoute.js
import React, { useEffect, useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from "react-router-dom";
const MySwal = withReactContent(Swal);

function PrivateRoute({ component: Component, ...rest }) {
    const { setActivePage, setToken, token, emailGlobal, setEmailGlobal, idUserGlobal, setIdUserGlobal, userName, setUserName } = useContext(GlobalContext)
    const history = useHistory();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
    const url = `${API_BASE_URL}/users/${emailGlobal}`;
    const [isLoading, setIsLoading] = useState(false);

    return isLoading ? (
        // Render a loading state or spinner while waiting for the token and user data
        // For example:
        <div>Loading...</div>
    ) : (
        <Route
            {...rest}
            render={(props) =>
                <Component {...props} />
            }
        />
    );
}

export { PrivateRoute };

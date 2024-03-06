// PrivateRoute.js
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
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

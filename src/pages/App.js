import { useState, useEffect } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { MainPage } from '../components/MainPage';

import { PageProvider } from '../context/GlobalContext';
// import { RegisterSteps } from './register/registerSteps';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { PrivateRoute } from '../components/Shared/PrivateRoute';
// import { Login } from './login';
// import { ApproveTask } from './clientContent/approveTask';
// import { ForgotPassword } from './register/registerSteps/ForgotPassword';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <PageProvider>
                    <Switch>
                        <Route exact path='/' component={MainPage} />
                        <PrivateRoute exact path='/:component' component={MainPage} />
                        {/* <Route exact path='/approveTask' component={ApproveTask} />
                        <Route exact path='/register' component={RegisterSteps} />
                        <Route exact path='/forgotPassword' component={ForgotPassword} />
                        <Elements stripe={stripePromise}>
                            <PrivateRoute exact path='/user/:component' component={MainPage} />
                        </Elements> */}
                    </Switch>
                </PageProvider>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;

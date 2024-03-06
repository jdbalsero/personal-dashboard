import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { MainPage } from '../components/MainPage';
import { PageProvider } from '../context/GlobalContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { PrivateRoute } from '../components/Shared/PrivateRoute';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <PageProvider>
                    <Switch>
                        <Route exact path='/' component={MainPage} />
                        <PrivateRoute exact path='/:component' component={MainPage} />
                    </Switch>
                </PageProvider>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;

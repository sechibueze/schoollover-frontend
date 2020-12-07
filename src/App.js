import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import './App.scss';
import { loadCurrentUser } from './_actions/AuthActions';

import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Auth/Dashboard/Dashboard';
import Authenticate from './components/_utlis/Authenticate';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AccountConfirmation from './components/AccountConfirmation/AccountConfirmation';
const Projects = () => <h1> Projects to be funded</h1>
const Learn = () => <h1> Learn about what teachers in challenging context are doing to make impact </h1>

store.dispatch(loadCurrentUser());

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/projects' component={Projects} />
                    <Route exact path='/learn' component={Learn} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Register} />
                    <Route exact path='/forgot-password' component={ForgotPassword} />
                    <Route exact path='/auth/reset-password/:passwordResetToken' component={ResetPassword} />
                    <Route exact path='/auth/:id/account-confirmation' component={AccountConfirmation} />
                    <Authenticate exact path='/dashboard' component={Dashboard} />
                    <Route  component={NotFound} />
                </Switch>
                <Footer />
            </Router>
        </Provider>
    );
};

export default App;

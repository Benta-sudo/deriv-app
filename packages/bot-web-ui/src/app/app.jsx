import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/login/login';
import OAuthCallback from '../pages/oauth/callback';
import Dashboard from '../pages/dashboard/dashboard.jsx';
import { derivApiService } from '../services/deriv-api-service';

const App = () => {
    const isAuthenticated = () => {
        return !!localStorage.getItem('deriv_token');
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );

    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/oauth/callback' component={OAuthCallback} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <Redirect from='/' to='/dashboard' />
            </Switch>
        </Router>
    );
};

export default App;

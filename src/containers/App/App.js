import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';

import { Provider } from 'react-redux';
import store from '../../store';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "../../components/layout/Navbar/Navbar";
import Landing from "../../components/layout/Landing/Landing";
import Register from '../../components/auth/Register/Register';
import Login from '../../components/auth/Login/Login';
import PrivateRoute from '../../components/private-route/PrivateRoute';
import Dashboard from '../../components/dashboard/Dashboard';

import PremierLeague from '../../components/forums/PremierLeague/PremierLeague';
import SerieA from '../../components/forums/SerieA/SerieA';
import LaLiga from '../../components/forums/LaLiga/LaLiga';
import Allsvenskan from '../../components/forums/Allsvenskan/Allsvenskan';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/premierleague" component={PremierLeague} />
            <Route path="/seriea" component={SerieA} />
            <Route path="/laliga" component={LaLiga} />
            <Route path="/allsvenskan" component={Allsvenskan} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
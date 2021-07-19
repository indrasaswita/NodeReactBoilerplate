import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home/index.jsx';
import List from './pages/list';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';
import { mapCookieToAuth } from "./actions/authAction";

import Cookies from "universal-cookie";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Header from "./components/header/index";

const cookies = new Cookies();

class App extends Component {

  constructor(props) {
    super(props);

    const auth = {
      user: cookies.get('auth_user'),
      token: cookies.get('auth_token'),
    };

    this.props.mapCookieToAuth(auth);
  }

  render() {
    return (
        <div className="AppWrapper">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/list" component={List} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/signin" component={Login} />
            </Switch>
          </Router>
        </div>
    );
  }
}

App.propTypes = {
  mapCookieToAuth: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  mapCookieToAuth,
})(App);

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home/index.jsx';
import List from './pages/list';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Router>
            <div>
              <h2>Welcome</h2>
              <ul>
                <li>
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li>
                  <Link to={'/about'} className="nav-link">About</Link>
                </li>
                <li>
                  <Link to={'/list'} className="nav-link">List</Link>
                </li>
                <li>
                  <Link to={'/signup'} className="nav-link">Register</Link>
                </li>
                <li>
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
              </ul>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/list" component={List} />

                <Route exact path="/list/list" component={List} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/signin" component={Login} />
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;

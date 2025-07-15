import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Navigate, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import User from './User';

class App extends Component {
  state = {
    loggedIn: false
  };

  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><NavLink to="/" end style={({ isActive }) => isActive ? { color: 'green' } : {}}>Home</NavLink></li>
            <li><NavLink to="/about" style={({ isActive }) => isActive ? { color: 'green' } : {}}>About</NavLink></li>
            <li><NavLink to="/user/john" style={({ isActive }) => isActive ? { color: 'green' } : {}}>User John</NavLink></li>
            <li><NavLink to="/user/peter" style={({ isActive }) => isActive ? { color: 'green' } : {}}>User Peter</NavLink></li>
          </ul>

          <input
            type="button"
            value={this.state.loggedIn ? 'Log out' : 'Log in'}
            onClick={this.loginHandle}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/user/:username/*"
              element={this.state.loggedIn ? <User /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

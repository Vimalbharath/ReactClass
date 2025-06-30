import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Redirect, Prompt, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './component/Home';
import About from './component/About';

const User = (params) => {
  return ( <h1> Welcome User {params.username} </h1>)
}

class App extends Component {
  state = {
    loggedIn:false
  }

  loginHandle = () => {
    this.setState(prevState => ({
     loggedIn: !prevState.loggedIn  
    }))
  }
  
  render() {
    return (
      <Router>
        <div className="App">
        <ul>
          <li>
            <NavLink to="/" exact activeStyle={
              { color:'green' }
            }>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeStyle={
              { color:'green' }
            }>About</NavLink>
          </li>
          <li>
            <NavLink to="/user/john" exact activeStyle={
              { color:'green' }
            }>User John</NavLink>
          </li>
          <li>
            <NavLink to="/user/peter" exact activeStyle={
              { color:'green' }
            }>User Peter</NavLink>
          </li>
          </ul>
          <Prompt
            when={!this.state.loggedIn}
            message={(location)=>{
               return location.pathname.startsWith('/user') ? 'Are you sure loggedIn?' : true
             }}
          />

        <input type="button" value={this.state.loggedIn ? 'log out': 'log in'} onClick={this.loginHandle.bind(this)}/>
        <Switch>
          <Route path="/" exact strict render={
            () => {
              return ( <Home/>);
            }
          }/>
          <Route path="/about" exact strict render={
            () => {
              return ( <About/>);
            }
          }/>
          <Route path="/user/:username" exact strict render={({match})=>(
            this.state.loggedIn ? ( <User username={match.params.username}/>) : (<Redirect to='/' />)
          )}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

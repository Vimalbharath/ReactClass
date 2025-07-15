import { Component } from "react"
import { BrowserRouter as Router, NavLink, Navigate, Routes, Route } from 'react-router-dom';
import AddBook from "./AddBook";
import Dashboard from "./Dashboard";
import Help from "./Help"

class BookApp extends Component{
    render(){
        return(
            <Router>
            <div>
            <h1>React Router</h1>
            <h2>Book Management App</h2>
            <NavLink to="dashboard"> Dashboard</NavLink>
             <NavLink to="addbook"> AddBook</NavLink>
              <NavLink to="help"> Help</NavLink>
          
            <Routes>
        <Route path="dashboard" element={<Dashboard />} />
            <Route path="addbook" element={<AddBook />} />
            <Route path="help" element={<Help />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
            </div>
            </Router>

        );
    }
}

export default BookApp;
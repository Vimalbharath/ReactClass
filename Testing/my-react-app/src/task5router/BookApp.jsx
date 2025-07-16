import { Component } from "react"
import { BrowserRouter as Router, NavLink, Navigate, Routes, Route } from 'react-router-dom';
import AddBook from "./AddBook";
import Dashboard from "./Dashboard";
import Help from "./Help"
import BookDetail from "./BookDetail";

class BookApp extends Component{
     constructor(props) {
        super(props);
        this.state = { 
            books:[
                {"id":"1","book":"MS","description":"Dhoni"},
                {"id":"2","book":"Virat","description":"Kholi"},
                {"id":"3","book":"Rohit","description":"Sharma"}
            ],
            book:{},
            addFlag:false

         };
    }
    handleAddBook = (newBookData) => {
   
   

    this.setState((prevState) => ({
      books: [...prevState.books, newBookData], // Add the new book object to the array
    }));
    console.log("Book added:", newBookData);
  };
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
        <Route path="dashboard" element={<Dashboard books={this.state.books}/>} />
            <Route path="addbook" element={<AddBook addBook={this.handleAddBook}/>} />
            <Route path="help" element={<Help />} />
            <Route path="/dashboard/books/:bookId" element={<BookDetail books={this.state.books} />} />
            <Route path="/" element={<Dashboard books={this.state.books}/>} />
            <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
            </div>
            </Router>

        );
    }
}

export default BookApp;
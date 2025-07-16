import { Component } from "react"
import AddBook from "./AddBook";
import Dashboard from "./Dashboard";
import Axios from "axios";


class BookApp extends Component{
     constructor(props) {
        super(props);
        this.state = { 
            books:[
                
            ],
            book:{},
            showdashboard:true,
            addFlag:false

         };
    }
     componentDidMount(){
        Axios.get('http://localhost:3006/books').then((res)=>{
            console.log(res.data);
            this.setState({books:res.data})
        }).catch((error)=>{
            console.log(error);
        })
    }
  //   handleAddBook = (newBookData) => {
  //   this.setState((prevState) => ({
  //     books: [...prevState.books, newBookData], 
  //   }));
  //   console.log("Book added:", newBookData);
  // };
   // This method will be passed to AddBook component
  handleAddBook = (newBookData) => {
   
    Axios.post('http://localhost:3006/books', newBookData)
      .then((res) => {
        console.log("Book added successfully to DB:", res.data);
        // this.fetchBooks();
        // Option 2: Add the new book returned by the server to the state
        this.setState(prevState => ({
          books: [...prevState.books, res.data],
        }));
        alert("Book added successfully!");
        this.setState({showdashboard:true }); // Navigate back to dashboard after adding
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        alert("Failed to add book. Please try again.");
        // Revert UI if optimistic update was used and failed, or show error
      });
  };
    render(){
        return(<div>
         <h1>React Axios</h1>
         <h2>Book Management App</h2>
         <button onClick={()=>this.setState({showdashboard:true,addFlag:false})}>Dashboard</button>
         <button onClick={()=>this.setState({showdashboard:false,addFlag:true})}>Add Book </button>
         {this.state.showdashboard?<Dashboard books={this.state.books}/>:(<AddBook addBook={this.handleAddBook}/>)}
          </div>
        );
    }
}

export default BookApp;
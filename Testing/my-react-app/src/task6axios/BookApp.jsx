import { Component } from "react"
import AddBook from "./AddBook";
import Dashboard from "./Dashboard";
import Axios from "axios";
import UpdateBook from "./UpdateBook";


class BookApp extends Component{
     constructor(props) {
        super(props);
        this.state = { 
            books:[
                
            ],
            book:null,
            showdashboard:true,
            addFlag:false,
            updateFlag:false

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

 
  handleDeleteBook = (bookId) => {
    if (window.confirm(`Are you sure you want to delete book with ID: ${bookId}?`)) {
      Axios.delete(`http://localhost:3006/books/${bookId}`)
        .then(() => {
          console.log(`Book with ID ${bookId} deleted successfully.`);
          // Optimistically update UI or re-fetch
          this.setState(prevState => ({
            books: prevState.books.filter(book => String(book.id) !== String(bookId)),
           showdashboard:true
          }));
          alert("Book deleted successfully!");
        })
        .catch((error) => {
          console.error(`Error deleting book with ID ${bookId}:`, error);
          alert("Failed to delete book. Please try again.");
        });
    }
  };

  // NEW: Update a single book
   editon = (bookid) => {
      console.log(this.state.book);
        let editor=this.state.books.find(book => String(book.id) === String(bookid))

      this.setState({showdashboard:false,addFlag:false,updateFlag:true,book:editor
      });
      console.log(editor)
   }
  editoff = (updatedBookData) => {
    Axios.put(`http://localhost:3006/books/${updatedBookData.id}`, updatedBookData)
      .then((res) => {
        console.log("Book updated successfully in DB:", res.data);
       
       
        this.setState(prevState => ({
          books: prevState.books.map(book =>
            String(book.id) === String(res.data.id) ? res.data : book
          ),
         
          showdashboard:true,
          addFlag:false ,
          updateFlag:false
        }));
        alert("Book updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        alert("Failed to update book. Please try again.");
      });
  };
    render(){
        return(<div>
         <h1>React Axios</h1>
         <h2>Book Management App</h2>
         <button onClick={()=>this.setState({showdashboard:true,addFlag:false,updateFlag:false})}>Dashboard</button>
         <button onClick={()=>this.setState({showdashboard:false,addFlag:true,updateFlag:false})}>Add Book </button>
         {this.state.showdashboard && <Dashboard books={this.state.books} delete={this.handleDeleteBook} editon={this.editon}/>}
         {this.state.addFlag && (<AddBook addBook={this.handleAddBook}/>)}
         {this.state.updateFlag && <UpdateBook editoff={this.editoff} book={this.state.book}/>}
          </div>
        );
    }
}

export default BookApp;
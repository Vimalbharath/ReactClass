import { Component } from "react"
  // import AddBook from "./AddBook";
  // import Dashboard from "./Dashboard";


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
        return(<div>
         <h1>React Axios</h1>
         <h2>Book Management App</h2>
          </div>
        );
    }
}

export default BookApp;